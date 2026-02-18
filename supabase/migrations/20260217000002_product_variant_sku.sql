-- ============================================================
-- Migration: Product / Variant / SKU Architecture
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- PRODUCTS  (abstract parent — not directly sellable)
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.product_status AS ENUM ('draft', 'active', 'archived');

CREATE TABLE public.products (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id          UUID REFERENCES public.brands (id) ON DELETE SET NULL,
    name              TEXT NOT NULL,
    slug              TEXT NOT NULL UNIQUE,
    description       TEXT,
    short_description TEXT,
    base_price        NUMERIC(12, 2) NOT NULL DEFAULT 0,
    compare_at_price  NUMERIC(12, 2),               -- original / MRP for showing discounts
    currency          TEXT NOT NULL DEFAULT 'INR',
    status            public.product_status NOT NULL DEFAULT 'draft',
    care_instructions TEXT,
    meta_title        TEXT,
    meta_description  TEXT,
    is_featured       BOOLEAN NOT NULL DEFAULT false,
    is_new_arrival    BOOLEAN NOT NULL DEFAULT false,
    tags              TEXT[] DEFAULT '{}',
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_slug     ON public.products (slug);
CREATE INDEX idx_products_brand    ON public.products (brand_id);
CREATE INDEX idx_products_status   ON public.products (status);
CREATE INDEX idx_products_featured ON public.products (is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_tags     ON public.products USING GIN (tags);

-- ─────────────────────────────────────────────────────────────
-- PRODUCT ↔ CATEGORY  (many-to-many)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.product_categories (
    product_id  UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories (id) ON DELETE CASCADE,
    sort_order  INT NOT NULL DEFAULT 0,
    PRIMARY KEY (product_id, category_id)
);

-- ─────────────────────────────────────────────────────────────
-- PRODUCT ↔ COLLECTION  (many-to-many)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.product_collections (
    product_id    UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    collection_id UUID NOT NULL REFERENCES public.collections (id) ON DELETE CASCADE,
    sort_order    INT NOT NULL DEFAULT 0,
    PRIMARY KEY (product_id, collection_id)
);

-- ─────────────────────────────────────────────────────────────
-- PRODUCT ATTRIBUTES  (product-level: Fabric, Wash Care, etc.)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.product_attributes (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id   UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    attribute_id UUID NOT NULL REFERENCES public.attribute_definitions (id) ON DELETE CASCADE,
    value        TEXT NOT NULL,                     -- freeform value for text / number attrs
    UNIQUE (product_id, attribute_id)
);

CREATE INDEX idx_product_attrs_product ON public.product_attributes (product_id);

-- ─────────────────────────────────────────────────────────────
-- PRODUCT IMAGES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.product_images (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    variant_id UUID,                                -- nullable — set if image is variant-specific
    url        TEXT NOT NULL,
    alt_text   TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_product_images_product ON public.product_images (product_id);
CREATE INDEX idx_product_images_variant ON public.product_images (variant_id) WHERE variant_id IS NOT NULL;

-- ─────────────────────────────────────────────────────────────
-- PRODUCT VARIANTS  (sellable SKU)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.product_variants (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id      UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    sku             TEXT NOT NULL UNIQUE,
    barcode         TEXT,
    price_override  NUMERIC(12, 2),                -- null = use product.base_price
    compare_at_price NUMERIC(12, 2),
    cost_price      NUMERIC(12, 2),                -- for margin calculation
    weight_grams    INT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    sort_order      INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_variants_product ON public.product_variants (product_id);
CREATE INDEX idx_variants_sku     ON public.product_variants (sku);

-- ─────────────────────────────────────────────────────────────
-- VARIANT ↔ ATTRIBUTE VALUES  (e.g., Size: M, Color: Blue)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.variant_attribute_values (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id      UUID NOT NULL REFERENCES public.product_variants (id) ON DELETE CASCADE,
    attribute_id    UUID NOT NULL REFERENCES public.attribute_definitions (id) ON DELETE CASCADE,
    option_id       UUID NOT NULL REFERENCES public.attribute_options (id) ON DELETE CASCADE,
    UNIQUE (variant_id, attribute_id)
);

CREATE INDEX idx_vav_variant ON public.variant_attribute_values (variant_id);
CREATE INDEX idx_vav_option  ON public.variant_attribute_values (option_id);

-- ─────────────────────────────────────────────────────────────
-- FOREIGN KEY: product_images.variant_id → product_variants
-- (deferred because product_variants didn't exist yet)
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.product_images
    ADD CONSTRAINT fk_product_images_variant
    FOREIGN KEY (variant_id) REFERENCES public.product_variants (id) ON DELETE SET NULL;

-- ─────────────────────────────────────────────────────────────
-- AUTO-UPDATE TRIGGERS
-- ─────────────────────────────────────────────────────────────
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products         FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_variants_updated BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
