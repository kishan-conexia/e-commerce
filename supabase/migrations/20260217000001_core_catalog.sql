-- ============================================================
-- Migration: Core Catalog — Categories, Collections, Brands
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- BRANDS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.brands (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    logo_url    TEXT,
    description TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_brands_slug ON public.brands (slug);

-- ─────────────────────────────────────────────────────────────
-- CATEGORIES  (recursive tree via parent_id)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id   UUID REFERENCES public.categories (id) ON DELETE SET NULL,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url   TEXT,
    sort_order  INT NOT NULL DEFAULT 0,
    depth       INT NOT NULL DEFAULT 0,        -- 0 = root
    path        TEXT NOT NULL DEFAULT '',       -- materialized path for fast lookups, e.g. "women/clothing/dresses"
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_parent ON public.categories (parent_id);
CREATE INDEX idx_categories_slug   ON public.categories (slug);
CREATE INDEX idx_categories_path   ON public.categories (path);

-- ─────────────────────────────────────────────────────────────
-- COLLECTIONS  (curated / seasonal groupings)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.collections (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url   TEXT,
    start_date  DATE,
    end_date    DATE,
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_collections_slug ON public.collections (slug);

-- ─────────────────────────────────────────────────────────────
-- ATTRIBUTE DEFINITIONS  (dynamic attribute system)
-- ─────────────────────────────────────────────────────────────
CREATE TYPE public.attribute_type AS ENUM ('select', 'multi_select', 'text', 'number', 'boolean');

CREATE TABLE public.attribute_definitions (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          TEXT NOT NULL,                -- e.g. "Size", "Color", "Fabric"
    slug          TEXT NOT NULL UNIQUE,
    type          public.attribute_type NOT NULL DEFAULT 'select',
    is_variant    BOOLEAN NOT NULL DEFAULT false,   -- true = used for variant generation (Size, Color)
    is_filterable BOOLEAN NOT NULL DEFAULT true,
    is_required   BOOLEAN NOT NULL DEFAULT false,
    sort_order    INT NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- ATTRIBUTE OPTIONS  (pre-defined values per attribute)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.attribute_options (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attribute_id    UUID NOT NULL REFERENCES public.attribute_definitions (id) ON DELETE CASCADE,
    value           TEXT NOT NULL,                  -- e.g. "XS", "Red", "Cotton"
    label           TEXT,                           -- display label override
    color_hex       TEXT,                           -- for color swatches
    sort_order      INT NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (attribute_id, value)
);

CREATE INDEX idx_attribute_options_attr ON public.attribute_options (attribute_id);

-- ─────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at TRIGGER
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_brands_updated      BEFORE UPDATE ON public.brands              FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_categories_updated   BEFORE UPDATE ON public.categories          FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_collections_updated  BEFORE UPDATE ON public.collections         FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_attr_defs_updated    BEFORE UPDATE ON public.attribute_definitions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
