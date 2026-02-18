-- ============================================================
-- Migration: Inventory Management System
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- STOCK LOCATIONS  (warehouses, stores, etc.)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.stock_locations (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    code        TEXT NOT NULL UNIQUE,               -- e.g. "WH-MUM-01", "STORE-DEL-03"
    type        TEXT NOT NULL DEFAULT 'warehouse',   -- warehouse, store, fulfillment_center
    address     JSONB,                              -- { line1, line2, city, state, postal_code, country }
    is_active   BOOLEAN NOT NULL DEFAULT true,
    is_default  BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- INVENTORY  (per-variant, per-location stock levels)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.inventory (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id        UUID NOT NULL REFERENCES public.product_variants (id) ON DELETE CASCADE,
    location_id       UUID NOT NULL REFERENCES public.stock_locations (id) ON DELETE CASCADE,
    quantity          INT NOT NULL DEFAULT 0,
    reserved_quantity INT NOT NULL DEFAULT 0,        -- reserved by pending orders
    reorder_point     INT NOT NULL DEFAULT 5,        -- alert when stock falls below
    reorder_quantity  INT NOT NULL DEFAULT 50,       -- suggested reorder amount
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (variant_id, location_id),
    CONSTRAINT chk_quantity_non_negative CHECK (quantity >= 0),
    CONSTRAINT chk_reserved_non_negative CHECK (reserved_quantity >= 0),
    CONSTRAINT chk_reserved_lte_quantity CHECK (reserved_quantity <= quantity)
);

CREATE INDEX idx_inventory_variant  ON public.inventory (variant_id);
CREATE INDEX idx_inventory_location ON public.inventory (location_id);
CREATE INDEX idx_inventory_low_stock ON public.inventory (variant_id) WHERE quantity <= reorder_point;

-- ─────────────────────────────────────────────────────────────
-- INVENTORY MOVEMENTS  (full audit trail)
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.inventory_movement_type AS ENUM (
    'purchase',      -- stock received from supplier
    'sale',          -- stock sold to customer
    'return',        -- customer return
    'adjustment',    -- manual correction
    'transfer_in',   -- received from another location
    'transfer_out',  -- sent to another location
    'reservation',   -- reserved for pending order
    'release'        -- released reservation (cancelled order)
);

CREATE TABLE public.inventory_movements (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_id  UUID NOT NULL REFERENCES public.inventory (id) ON DELETE CASCADE,
    type          public.inventory_movement_type NOT NULL,
    quantity      INT NOT NULL,                     -- positive for in, negative for out
    reference_id  UUID,                             -- order_id, transfer_id, etc.
    reference_type TEXT,                            -- 'order', 'transfer', 'adjustment'
    notes         TEXT,
    created_by    UUID,                             -- auth.users.id
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inv_movements_inventory ON public.inventory_movements (inventory_id);
CREATE INDEX idx_inv_movements_ref       ON public.inventory_movements (reference_id) WHERE reference_id IS NOT NULL;
CREATE INDEX idx_inv_movements_type      ON public.inventory_movements (type);

-- ─────────────────────────────────────────────────────────────
-- TRIGGER: Auto-update inventory quantity on movement insert
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.process_inventory_movement()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type IN ('purchase', 'return', 'transfer_in', 'release') THEN
        UPDATE public.inventory
        SET quantity = quantity + ABS(NEW.quantity),
            updated_at = now()
        WHERE id = NEW.inventory_id;
    ELSIF NEW.type IN ('sale', 'transfer_out') THEN
        UPDATE public.inventory
        SET quantity = quantity - ABS(NEW.quantity),
            updated_at = now()
        WHERE id = NEW.inventory_id;
    ELSIF NEW.type = 'reservation' THEN
        UPDATE public.inventory
        SET reserved_quantity = reserved_quantity + ABS(NEW.quantity),
            updated_at = now()
        WHERE id = NEW.inventory_id;
    ELSIF NEW.type = 'adjustment' THEN
        -- Adjustment uses the signed quantity directly
        UPDATE public.inventory
        SET quantity = quantity + NEW.quantity,
            updated_at = now()
        WHERE id = NEW.inventory_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_process_inventory_movement
    AFTER INSERT ON public.inventory_movements
    FOR EACH ROW
    EXECUTE FUNCTION public.process_inventory_movement();

-- Auto-update triggers
CREATE TRIGGER trg_stock_locations_updated BEFORE UPDATE ON public.stock_locations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
