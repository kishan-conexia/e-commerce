-- ============================================================
-- Migration: Wishlists, Reviews, Coupons
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- WISHLISTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.wishlists (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.customers (id) ON DELETE CASCADE,
    product_id  UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (customer_id, product_id)
);

CREATE INDEX idx_wishlists_customer ON public.wishlists (customer_id);

-- ─────────────────────────────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.reviews (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id         UUID NOT NULL REFERENCES public.customers (id) ON DELETE CASCADE,
    product_id          UUID NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
    order_item_id       UUID REFERENCES public.order_items (id) ON DELETE SET NULL,
    rating              SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title               TEXT,
    body                TEXT,
    images              TEXT[] DEFAULT '{}',         -- review images
    is_verified_purchase BOOLEAN NOT NULL DEFAULT false,
    is_approved         BOOLEAN NOT NULL DEFAULT false,
    helpful_count       INT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product  ON public.reviews (product_id);
CREATE INDEX idx_reviews_customer ON public.reviews (customer_id);
CREATE INDEX idx_reviews_rating   ON public.reviews (product_id, rating);

-- ─────────────────────────────────────────────────────────────
-- COUPONS
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.coupon_type AS ENUM ('percentage', 'fixed');

CREATE TABLE public.coupons (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code              TEXT NOT NULL UNIQUE,
    type              public.coupon_type NOT NULL DEFAULT 'percentage',
    value             NUMERIC(12, 2) NOT NULL,       -- percentage (0-100) or fixed amount
    min_order_amount  NUMERIC(12, 2) DEFAULT 0,
    max_discount      NUMERIC(12, 2),                -- cap for percentage discounts
    usage_limit       INT,                           -- total times it can be used (null = unlimited)
    per_user_limit    INT NOT NULL DEFAULT 1,         -- times each user can use it
    used_count        INT NOT NULL DEFAULT 0,
    applicable_categories UUID[] DEFAULT '{}',        -- restrict to certain categories
    applicable_products   UUID[] DEFAULT '{}',        -- restrict to certain products
    valid_from        TIMESTAMPTZ NOT NULL DEFAULT now(),
    valid_until       TIMESTAMPTZ,
    is_active         BOOLEAN NOT NULL DEFAULT true,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_coupons_code ON public.coupons (code);

-- ─────────────────────────────────────────────────────────────
-- COUPON USAGE TRACKING
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.coupon_usage (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id   UUID NOT NULL REFERENCES public.coupons (id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.customers (id) ON DELETE CASCADE,
    order_id    UUID NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
    discount_amount NUMERIC(12, 2) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_coupon_usage_coupon   ON public.coupon_usage (coupon_id);
CREATE INDEX idx_coupon_usage_customer ON public.coupon_usage (customer_id);

-- Auto-update triggers
CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_coupons_updated BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
