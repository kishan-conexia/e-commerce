-- ============================================================
-- Migration: Storage Bucket for Product Images
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. CREATE BUCKET
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880,  -- 5 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- ─────────────────────────────────────────────────────────────
-- 2. PUBLIC READ ACCESS (anyone can view product images)
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "public_read_product_images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'product-images');

-- ─────────────────────────────────────────────────────────────
-- 3. ADMIN UPLOAD / UPDATE / DELETE
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "admin_insert_product_images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'product-images'
        AND public.is_admin()
    );

CREATE POLICY "admin_update_product_images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'product-images'
        AND public.is_admin()
    );

CREATE POLICY "admin_delete_product_images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'product-images'
        AND public.is_admin()
    );
