-- ============================================================
-- Migration: Orders & Order Items
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- ORDER STATUS ENUM
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.order_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'returned',
    'refunded'
);

-- ─────────────────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.orders (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number      TEXT NOT NULL UNIQUE,
    customer_id       UUID NOT NULL REFERENCES public.customers (id) ON DELETE RESTRICT,
    status            public.order_status NOT NULL DEFAULT 'pending',

    -- Financial summary
    subtotal          NUMERIC(14, 2) NOT NULL DEFAULT 0,
    tax_amount        NUMERIC(14, 2) NOT NULL DEFAULT 0,
    shipping_amount   NUMERIC(14, 2) NOT NULL DEFAULT 0,
    discount_amount   NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_amount      NUMERIC(14, 2) NOT NULL DEFAULT 0,
    currency          TEXT NOT NULL DEFAULT 'INR',

    -- Address snapshots (frozen at time of order)
    shipping_address  JSONB NOT NULL,
    billing_address   JSONB,

    -- Coupon reference
    coupon_id         UUID,
    coupon_code       TEXT,

    -- Shipping details
    shipping_method   TEXT,
    tracking_number   TEXT,
    tracking_url      TEXT,
    estimated_delivery DATE,

    notes             TEXT,
    placed_at         TIMESTAMPTZ,
    shipped_at        TIMESTAMPTZ,
    delivered_at      TIMESTAMPTZ,
    cancelled_at      TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_customer     ON public.orders (customer_id);
CREATE INDEX idx_orders_number       ON public.orders (order_number);
CREATE INDEX idx_orders_status       ON public.orders (status);
CREATE INDEX idx_orders_placed_at    ON public.orders (placed_at DESC);

-- ─────────────────────────────────────────────────────────────
-- ORDER ITEMS  (snapshot of product at purchase time)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.order_items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id        UUID NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
    variant_id      UUID REFERENCES public.product_variants (id) ON DELETE SET NULL,

    -- Snapshot fields (preserved even if product changes/deletes)
    product_name    TEXT NOT NULL,
    variant_sku     TEXT NOT NULL,
    variant_options JSONB,                          -- e.g. {"Size": "M", "Color": "Navy"}
    image_url       TEXT,

    quantity        INT NOT NULL DEFAULT 1,
    unit_price      NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    tax_amount      NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_price     NUMERIC(12, 2) NOT NULL,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order   ON public.order_items (order_id);
CREATE INDEX idx_order_items_variant ON public.order_items (variant_id);

-- ─────────────────────────────────────────────────────────────
-- ORDER STATUS HISTORY  (audit timeline)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.order_status_history (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id    UUID NOT NULL REFERENCES public.orders (id) ON DELETE CASCADE,
    from_status public.order_status,
    to_status   public.order_status NOT NULL,
    changed_by  UUID,                               -- admin / system user
    notes       TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_history_order ON public.order_status_history (order_id);

-- ─────────────────────────────────────────────────────────────
-- AUTO-GENERATE ORDER NUMBER
-- ─────────────────────────────────────────────────────────────
CREATE SEQUENCE public.order_number_seq START WITH 100001;

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number = 'ORD-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(nextval('public.order_number_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_order_number();

-- Auto-update triggers
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
