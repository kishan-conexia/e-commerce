-- ============================================================
-- Migration: Atomic Product Creation RPC
-- ============================================================
-- This function handles the ENTIRE product creation as a single
-- atomic database transaction. If any step fails, everything
-- is rolled back — no ghost products, no partial data.
--
-- Payload structure (JSONB):
-- {
--   "product": { name, slug, brand_id, description, short_description,
--                base_price, compare_at_price, status, care_instructions,
--                meta_title, meta_description, is_featured, is_new_arrival, tags[] },
--   "category_ids": ["uuid", ...],
--   "collection_ids": ["uuid", ...],
--   "attributes": [{ attribute_id, value }, ...],
--   "images": [{ url, alt_text, sort_order, is_primary }, ...],
--   "variants": [{
--     sku, barcode, price_override, compare_at_price, cost_price,
--     weight_grams, is_active, sort_order,
--     attribute_values: [{ attribute_id, option_id }, ...],
--     stock_quantity: number
--   }, ...]
-- }
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.create_complete_product(payload JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_product_id   UUID;
    v_variant_id   UUID;
    v_product      JSONB := payload -> 'product';
    v_cat          JSONB;
    v_coll         JSONB;
    v_attr         JSONB;
    v_img          JSONB;
    v_variant      JSONB;
    v_vav          JSONB;
    v_variant_count INT := 0;
    v_location_id  UUID;
BEGIN
    -- ─── 1. INSERT PRODUCT ───────────────────────────────────
    INSERT INTO public.products (
        name, slug, brand_id, description, short_description,
        base_price, compare_at_price, status, care_instructions,
        meta_title, meta_description, is_featured, is_new_arrival, tags
    ) VALUES (
        v_product ->> 'name',
        v_product ->> 'slug',
        (v_product ->> 'brand_id')::UUID,
        v_product ->> 'description',
        v_product ->> 'short_description',
        COALESCE((v_product ->> 'base_price')::NUMERIC, 0),
        (v_product ->> 'compare_at_price')::NUMERIC,
        COALESCE((v_product ->> 'status')::public.product_status, 'draft'),
        v_product ->> 'care_instructions',
        v_product ->> 'meta_title',
        v_product ->> 'meta_description',
        COALESCE((v_product ->> 'is_featured')::BOOLEAN, false),
        COALESCE((v_product ->> 'is_new_arrival')::BOOLEAN, false),
        COALESCE(
            (SELECT array_agg(elem::TEXT) FROM jsonb_array_elements_text(v_product -> 'tags') AS elem),
            '{}'
        )
    )
    RETURNING id INTO v_product_id;

    -- ─── 2. INSERT CATEGORIES ────────────────────────────────
    IF payload -> 'category_ids' IS NOT NULL THEN
        FOR v_cat IN SELECT * FROM jsonb_array_elements(payload -> 'category_ids')
        LOOP
            INSERT INTO public.product_categories (product_id, category_id)
            VALUES (v_product_id, (v_cat #>> '{}')::UUID);
        END LOOP;
    END IF;

    -- ─── 3. INSERT COLLECTIONS ───────────────────────────────
    IF payload -> 'collection_ids' IS NOT NULL THEN
        FOR v_coll IN SELECT * FROM jsonb_array_elements(payload -> 'collection_ids')
        LOOP
            INSERT INTO public.product_collections (product_id, collection_id)
            VALUES (v_product_id, (v_coll #>> '{}')::UUID);
        END LOOP;
    END IF;

    -- ─── 4. INSERT PRODUCT ATTRIBUTES ────────────────────────
    IF payload -> 'attributes' IS NOT NULL THEN
        FOR v_attr IN SELECT * FROM jsonb_array_elements(payload -> 'attributes')
        LOOP
            INSERT INTO public.product_attributes (product_id, attribute_id, value)
            VALUES (
                v_product_id,
                (v_attr ->> 'attribute_id')::UUID,
                v_attr ->> 'value'
            );
        END LOOP;
    END IF;

    -- ─── 5. INSERT IMAGES ────────────────────────────────────
    IF payload -> 'images' IS NOT NULL THEN
        FOR v_img IN SELECT * FROM jsonb_array_elements(payload -> 'images')
        LOOP
            INSERT INTO public.product_images (product_id, url, alt_text, sort_order, is_primary)
            VALUES (
                v_product_id,
                v_img ->> 'url',
                v_img ->> 'alt_text',
                COALESCE((v_img ->> 'sort_order')::INT, 0),
                COALESCE((v_img ->> 'is_primary')::BOOLEAN, false)
            );
        END LOOP;
    END IF;

    -- ─── 6. INSERT VARIANTS + ATTRIBUTE VALUES + INVENTORY ───
    -- Get or create default stock location
    SELECT id INTO v_location_id FROM public.stock_locations WHERE is_default = true LIMIT 1;
    IF v_location_id IS NULL THEN
        INSERT INTO public.stock_locations (name, code, type, is_active, is_default)
        VALUES ('Default Warehouse', 'WH-DEFAULT', 'warehouse', true, true)
        RETURNING id INTO v_location_id;
    END IF;

    IF payload -> 'variants' IS NOT NULL THEN
        FOR v_variant IN SELECT * FROM jsonb_array_elements(payload -> 'variants')
        LOOP
            INSERT INTO public.product_variants (
                product_id, sku, barcode, price_override, compare_at_price,
                cost_price, weight_grams, is_active, sort_order
            ) VALUES (
                v_product_id,
                v_variant ->> 'sku',
                v_variant ->> 'barcode',
                (v_variant ->> 'price_override')::NUMERIC,
                (v_variant ->> 'compare_at_price')::NUMERIC,
                (v_variant ->> 'cost_price')::NUMERIC,
                (v_variant ->> 'weight_grams')::INT,
                COALESCE((v_variant ->> 'is_active')::BOOLEAN, true),
                COALESCE((v_variant ->> 'sort_order')::INT, 0)
            )
            RETURNING id INTO v_variant_id;

            -- Variant attribute values
            IF v_variant -> 'attribute_values' IS NOT NULL THEN
                FOR v_vav IN SELECT * FROM jsonb_array_elements(v_variant -> 'attribute_values')
                LOOP
                    INSERT INTO public.variant_attribute_values (variant_id, attribute_id, option_id)
                    VALUES (
                        v_variant_id,
                        (v_vav ->> 'attribute_id')::UUID,
                        (v_vav ->> 'option_id')::UUID
                    );
                END LOOP;
            END IF;

            -- Create inventory record
            INSERT INTO public.inventory (variant_id, location_id, quantity)
            VALUES (
                v_variant_id,
                v_location_id,
                COALESCE((v_variant ->> 'stock_quantity')::INT, 0)
            );

            v_variant_count := v_variant_count + 1;
        END LOOP;
    END IF;

    -- ─── RETURN RESULT ───────────────────────────────────────
    RETURN jsonb_build_object(
        'product_id', v_product_id,
        'variant_count', v_variant_count,
        'success', true
    );

EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'create_complete_product failed: % %', SQLERRM, SQLSTATE;
END;
$$;
