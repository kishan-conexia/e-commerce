-- ============================================================
-- Migration: Row Level Security Policies
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- ENABLE RLS ON ALL TABLES
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attribute_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attribute_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variant_attribute_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────
-- PUBLIC READ — Storefront (anon + authenticated)
-- ─────────────────────────────────────────────────────────────
-- Catalog tables: anyone can read active items
CREATE POLICY "Public can view active brands"       ON public.brands              FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active categories"   ON public.categories          FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active collections"  ON public.collections         FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view attributes"          ON public.attribute_definitions FOR SELECT USING (true);
CREATE POLICY "Public can view attribute options"   ON public.attribute_options    FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active products"     ON public.products            FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view product categories"  ON public.product_categories  FOR SELECT USING (true);
CREATE POLICY "Public can view product collections" ON public.product_collections FOR SELECT USING (true);
CREATE POLICY "Public can view product attributes"  ON public.product_attributes  FOR SELECT USING (true);
CREATE POLICY "Public can view product images"      ON public.product_images      FOR SELECT USING (true);
CREATE POLICY "Public can view active variants"     ON public.product_variants    FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view variant attributes"  ON public.variant_attribute_values FOR SELECT USING (true);
CREATE POLICY "Public can view active coupons"      ON public.coupons             FOR SELECT USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));
CREATE POLICY "Public can view approved reviews"    ON public.reviews             FOR SELECT USING (is_approved = true);

-- ─────────────────────────────────────────────────────────────
-- AUTHENTICATED USER — Own Data
-- ─────────────────────────────────────────────────────────────
-- Customers: users can read/update their own profile
CREATE POLICY "Users can view own profile"    ON public.customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"  ON public.customers FOR UPDATE USING (auth.uid() = id);

-- Addresses: users manage their own addresses
CREATE POLICY "Users can view own addresses"  ON public.addresses FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can insert addresses"    ON public.addresses FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Users can update own addresses"ON public.addresses FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Users can delete own addresses"ON public.addresses FOR DELETE USING (auth.uid() = customer_id);

-- Orders: users can view their own orders
CREATE POLICY "Users can view own orders"       ON public.orders             FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can view own order items"  ON public.order_items        FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
);
CREATE POLICY "Users can view own order history" ON public.order_status_history FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND orders.customer_id = auth.uid())
);

-- Payments: users can view payments for their orders
CREATE POLICY "Users can view own payments"   ON public.payments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = payments.order_id AND orders.customer_id = auth.uid())
);
CREATE POLICY "Users can view own refunds"    ON public.refunds FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = refunds.order_id AND orders.customer_id = auth.uid())
);

-- Wishlists: authenticated users manage their wishlist
CREATE POLICY "Users can view own wishlist"   ON public.wishlists FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can add to wishlist"     ON public.wishlists FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Users can remove from wishlist"ON public.wishlists FOR DELETE USING (auth.uid() = customer_id);

-- Reviews: users can create and manage their own reviews
CREATE POLICY "Users can create reviews"      ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Users can update own reviews"  ON public.reviews FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Users can delete own reviews"  ON public.reviews FOR DELETE USING (auth.uid() = customer_id);

-- Coupon usage: users can view their own coupon usage
CREATE POLICY "Users can view own coupon usage" ON public.coupon_usage FOR SELECT USING (auth.uid() = customer_id);

-- ─────────────────────────────────────────────────────────────
-- SERVICE ROLE — Full Access (for admin API / server-side)
-- Supabase service_role key bypasses RLS by default,
-- so no explicit policies needed for admin ops.
-- ─────────────────────────────────────────────────────────────
