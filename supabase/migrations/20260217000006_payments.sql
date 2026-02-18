-- ============================================================
-- Migration: Gateway-Agnostic Payment Schema
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- PAYMENT STATUS & METHOD ENUMS
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.payment_status AS ENUM (
    'initiated',
    'authorized',
    'captured',
    'failed',
    'cancelled',
    'refunded',
    'partially_refunded'
);

CREATE TYPE public.payment_method AS ENUM (
    'card',
    'upi',
    'netbanking',
    'wallet',
    'emi',
    'cod',
    'bank_transfer',
    'gift_card'
);

-- ─────────────────────────────────────────────────────────────
-- PAYMENTS  (one order can have multiple payment attempts)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.payments (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id               UUID NOT NULL REFERENCES public.orders (id) ON DELETE RESTRICT,
    
    -- Gateway details (provider-agnostic)
    gateway                TEXT NOT NULL,             -- 'razorpay', 'stripe', 'paypal', etc.
    gateway_order_id       TEXT,                      -- gateway's order/session ID
    gateway_transaction_id TEXT,                      -- gateway's payment/charge ID
    gateway_payment_link   TEXT,                      -- checkout URL if applicable

    -- Payment info
    method                 public.payment_method,
    status                 public.payment_status NOT NULL DEFAULT 'initiated',
    amount                 NUMERIC(14, 2) NOT NULL,
    currency               TEXT NOT NULL DEFAULT 'INR',

    -- Raw gateway payload (for debugging & reconciliation)
    gateway_request        JSONB,                    -- what we sent
    gateway_response       JSONB,                    -- what they returned
    gateway_webhook_payload JSONB,                   -- webhook payload

    -- Card / method details (masked/tokenized)
    method_details         JSONB,                    -- {last4, brand, bank, vpa, wallet_name, ...}

    -- Metadata
    metadata               JSONB DEFAULT '{}',
    error_code             TEXT,
    error_message          TEXT,

    authorized_at          TIMESTAMPTZ,
    captured_at            TIMESTAMPTZ,
    failed_at              TIMESTAMPTZ,
    created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_order      ON public.payments (order_id);
CREATE INDEX idx_payments_gateway_tx ON public.payments (gateway_transaction_id) WHERE gateway_transaction_id IS NOT NULL;
CREATE INDEX idx_payments_status     ON public.payments (status);
CREATE INDEX idx_payments_gateway    ON public.payments (gateway);

-- ─────────────────────────────────────────────────────────────
-- REFUNDS
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.refund_status AS ENUM (
    'initiated',
    'processing',
    'completed',
    'failed'
);

CREATE TABLE public.refunds (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id            UUID NOT NULL REFERENCES public.payments (id) ON DELETE RESTRICT,
    order_id              UUID NOT NULL REFERENCES public.orders (id) ON DELETE RESTRICT,

    gateway_refund_id     TEXT,
    amount                NUMERIC(14, 2) NOT NULL,
    currency              TEXT NOT NULL DEFAULT 'INR',
    reason                TEXT,
    status                public.refund_status NOT NULL DEFAULT 'initiated',

    gateway_response      JSONB,
    metadata              JSONB DEFAULT '{}',

    initiated_by          UUID,                      -- admin user
    completed_at          TIMESTAMPTZ,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_refunds_payment ON public.refunds (payment_id);
CREATE INDEX idx_refunds_order   ON public.refunds (order_id);

-- Auto-update triggers
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_refunds_updated  BEFORE UPDATE ON public.refunds  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
