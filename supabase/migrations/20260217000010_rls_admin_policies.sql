-- ============================================================
-- Migration: Updated RLS Policies with Admin Full-Access
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- DROP OLD POLICIES (that reference "customers" table name or
-- lack admin access)
-- ─────────────────────────────────────────────────────────────

-- Profiles (was customers)
DROP POLICY IF EXISTS "Users can view own profile"    ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile"  ON public.profiles;

-- Addresses
DROP POLICY IF EXISTS "Users can view own addresses"   ON public.addresses;
DROP POLICY IF EXISTS "Users can insert addresses"     ON public.addresses;
DROP POLICY IF EXISTS "Users can update own addresses"  ON public.addresses;
DROP POLICY IF EXISTS "Users can delete own addresses"  ON public.addresses;

-- Catalog tables
DROP POLICY IF EXISTS "Public can view active brands"       ON public.brands;
DROP POLICY IF EXISTS "Public can view active categories"   ON public.categories;
DROP POLICY IF EXISTS "Public can view active collections"  ON public.collections;
DROP POLICY IF EXISTS "Public can view attributes"          ON public.attribute_definitions;
DROP POLICY IF EXISTS "Public can view attribute options"   ON public.attribute_options;
DROP POLICY IF EXISTS "Public can view active products"     ON public.products;
DROP POLICY IF EXISTS "Public can view product categories"  ON public.product_categories;
DROP POLICY IF EXISTS "Public can view product collections" ON public.product_collections;
DROP POLICY IF EXISTS "Public can view product attributes"  ON public.product_attributes;
DROP POLICY IF EXISTS "Public can view product images"      ON public.product_images;
DROP POLICY IF EXISTS "Public can view active variants"     ON public.product_variants;
DROP POLICY IF EXISTS "Public can view variant attributes"  ON public.variant_attribute_values;

-- Orders
DROP POLICY IF EXISTS "Users can view own orders"       ON public.orders;
DROP POLICY IF EXISTS "Users can view own order items"  ON public.order_items;
DROP POLICY IF EXISTS "Users can view own order history" ON public.order_status_history;

-- Payments
DROP POLICY IF EXISTS "Users can view own payments"   ON public.payments;
DROP POLICY IF EXISTS "Users can view own refunds"    ON public.refunds;

-- Wishlist & Reviews
DROP POLICY IF EXISTS "Users can view own wishlist"    ON public.wishlists;
DROP POLICY IF EXISTS "Users can add to wishlist"      ON public.wishlists;
DROP POLICY IF EXISTS "Users can remove from wishlist" ON public.wishlists;
DROP POLICY IF EXISTS "Users can create reviews"       ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews"   ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews"   ON public.reviews;
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can view active coupons"   ON public.coupons;
DROP POLICY IF EXISTS "Users can view own coupon usage"  ON public.coupon_usage;

-- Inventory (no old user policies, but add admin)
-- Stock locations, inventory, inventory_movements had no user policies

-- Enable RLS on profiles (was customers, RLS already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────
-- ADMIN FULL-ACCESS POLICIES (all tables)
-- Admins can SELECT, INSERT, UPDATE, DELETE on everything
-- ─────────────────────────────────────────────────────────────
-- Helper: admin check uses public.is_admin() from migration 009

-- Profiles
CREATE POLICY "admin_full_profiles"        ON public.profiles             FOR ALL USING (public.is_admin());
-- Addresses
CREATE POLICY "admin_full_addresses"       ON public.addresses            FOR ALL USING (public.is_admin());
-- Brands
CREATE POLICY "admin_full_brands"          ON public.brands               FOR ALL USING (public.is_admin());
-- Categories
CREATE POLICY "admin_full_categories"      ON public.categories           FOR ALL USING (public.is_admin());
-- Collections
CREATE POLICY "admin_full_collections"     ON public.collections          FOR ALL USING (public.is_admin());
-- Attribute Definitions
CREATE POLICY "admin_full_attr_defs"       ON public.attribute_definitions FOR ALL USING (public.is_admin());
-- Attribute Options
CREATE POLICY "admin_full_attr_opts"       ON public.attribute_options     FOR ALL USING (public.is_admin());
-- Products
CREATE POLICY "admin_full_products"        ON public.products             FOR ALL USING (public.is_admin());
-- Product Categories
CREATE POLICY "admin_full_product_cats"    ON public.product_categories   FOR ALL USING (public.is_admin());
-- Product Collections
CREATE POLICY "admin_full_product_colls"   ON public.product_collections  FOR ALL USING (public.is_admin());
-- Product Attributes
CREATE POLICY "admin_full_product_attrs"   ON public.product_attributes   FOR ALL USING (public.is_admin());
-- Product Images
CREATE POLICY "admin_full_product_images"  ON public.product_images       FOR ALL USING (public.is_admin());
-- Product Variants
CREATE POLICY "admin_full_variants"        ON public.product_variants     FOR ALL USING (public.is_admin());
-- Variant Attribute Values
CREATE POLICY "admin_full_vav"             ON public.variant_attribute_values FOR ALL USING (public.is_admin());
-- Stock Locations
CREATE POLICY "admin_full_stock_locs"      ON public.stock_locations      FOR ALL USING (public.is_admin());
-- Inventory
CREATE POLICY "admin_full_inventory"       ON public.inventory            FOR ALL USING (public.is_admin());
-- Inventory Movements
CREATE POLICY "admin_full_inv_movements"   ON public.inventory_movements  FOR ALL USING (public.is_admin());
-- Orders
CREATE POLICY "admin_full_orders"          ON public.orders               FOR ALL USING (public.is_admin());
-- Order Items
CREATE POLICY "admin_full_order_items"     ON public.order_items          FOR ALL USING (public.is_admin());
-- Order Status History
CREATE POLICY "admin_full_order_history"   ON public.order_status_history FOR ALL USING (public.is_admin());
-- Payments
CREATE POLICY "admin_full_payments"        ON public.payments             FOR ALL USING (public.is_admin());
-- Refunds
CREATE POLICY "admin_full_refunds"         ON public.refunds              FOR ALL USING (public.is_admin());
-- Wishlists
CREATE POLICY "admin_full_wishlists"       ON public.wishlists            FOR ALL USING (public.is_admin());
-- Reviews
CREATE POLICY "admin_full_reviews"         ON public.reviews              FOR ALL USING (public.is_admin());
-- Coupons
CREATE POLICY "admin_full_coupons"         ON public.coupons              FOR ALL USING (public.is_admin());
-- Coupon Usage
CREATE POLICY "admin_full_coupon_usage"    ON public.coupon_usage         FOR ALL USING (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- PUBLIC READ — Storefront (anon + authenticated)
-- ─────────────────────────────────────────────────────────────
CREATE POLICY "public_read_brands"          ON public.brands              FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_categories"      ON public.categories          FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_collections"     ON public.collections         FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_attr_defs"       ON public.attribute_definitions FOR SELECT USING (true);
CREATE POLICY "public_read_attr_opts"       ON public.attribute_options    FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_products"        ON public.products            FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_product_cats"    ON public.product_categories  FOR SELECT USING (true);
CREATE POLICY "public_read_product_colls"   ON public.product_collections FOR SELECT USING (true);
CREATE POLICY "public_read_product_attrs"   ON public.product_attributes  FOR SELECT USING (true);
CREATE POLICY "public_read_product_images"  ON public.product_images      FOR SELECT USING (true);
CREATE POLICY "public_read_variants"        ON public.product_variants    FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_vav"             ON public.variant_attribute_values FOR SELECT USING (true);
CREATE POLICY "public_read_coupons"         ON public.coupons             FOR SELECT USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));
CREATE POLICY "public_read_reviews"         ON public.reviews             FOR SELECT USING (is_approved = true);

-- ─────────────────────────────────────────────────────────────
-- AUTHENTICATED USER — Own Data (profiles table, references updated)
-- ─────────────────────────────────────────────────────────────
-- Profiles: users can read/update their own profile
CREATE POLICY "user_read_own_profile"   ON public.profiles  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "user_update_own_profile" ON public.profiles  FOR UPDATE USING (auth.uid() = id);

-- Addresses: users manage their own
CREATE POLICY "user_read_addresses"     ON public.addresses FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "user_insert_addresses"   ON public.addresses FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "user_update_addresses"   ON public.addresses FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "user_delete_addresses"   ON public.addresses FOR DELETE USING (auth.uid() = customer_id);

-- Orders
CREATE POLICY "user_read_orders"        ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "user_read_order_items"   ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
);
CREATE POLICY "user_read_order_history" ON public.order_status_history FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND orders.customer_id = auth.uid())
);

-- Payments
CREATE POLICY "user_read_payments"      ON public.payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = payments.order_id AND orders.customer_id = auth.uid())
);
CREATE POLICY "user_read_refunds"       ON public.refunds FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = refunds.order_id AND orders.customer_id = auth.uid())
);

-- Wishlists
CREATE POLICY "user_read_wishlist"      ON public.wishlists FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "user_insert_wishlist"    ON public.wishlists FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "user_delete_wishlist"    ON public.wishlists FOR DELETE USING (auth.uid() = customer_id);

-- Reviews
CREATE POLICY "user_insert_reviews"     ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "user_update_reviews"     ON public.reviews FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "user_delete_reviews"     ON public.reviews FOR DELETE USING (auth.uid() = customer_id);

-- Coupon Usage
CREATE POLICY "user_read_coupon_usage"  ON public.coupon_usage FOR SELECT USING (auth.uid() = customer_id);
