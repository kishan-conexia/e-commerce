-- ============================================================
-- Migration: Customers & Addresses
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- CUSTOMERS  (extends auth.users)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.customers (
    id              UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    first_name      TEXT,
    last_name       TEXT,
    display_name    TEXT,
    email           TEXT,
    phone           TEXT,
    avatar_url      TEXT,
    date_of_birth   DATE,
    gender          TEXT,
    loyalty_points  INT NOT NULL DEFAULT 0,
    total_orders    INT NOT NULL DEFAULT 0,
    total_spent     NUMERIC(14, 2) NOT NULL DEFAULT 0,
    notes           TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_email ON public.customers (email);
CREATE INDEX idx_customers_phone ON public.customers (phone);

-- ─────────────────────────────────────────────────────────────
-- ADDRESSES  (multiple per customer)
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.address_type AS ENUM ('shipping', 'billing');

CREATE TABLE public.addresses (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id   UUID NOT NULL REFERENCES public.customers (id) ON DELETE CASCADE,
    type          public.address_type NOT NULL DEFAULT 'shipping',
    is_default    BOOLEAN NOT NULL DEFAULT false,
    label         TEXT,                              -- "Home", "Office", etc.
    first_name    TEXT NOT NULL,
    last_name     TEXT NOT NULL,
    phone         TEXT,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    landmark      TEXT,
    city          TEXT NOT NULL,
    state         TEXT NOT NULL,
    postal_code   TEXT NOT NULL,
    country_code  TEXT NOT NULL DEFAULT 'IN',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_addresses_customer ON public.addresses (customer_id);

-- ─────────────────────────────────────────────────────────────
-- AUTO-CREATE CUSTOMER ON AUTH SIGNUP
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.customers (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Auto-update triggers
CREATE TRIGGER trg_customers_updated BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_addresses_updated BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
