-- ============================================================
-- Migration: Rename customers → profiles + Add RBAC
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. RENAME TABLE
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.customers RENAME TO profiles;

-- ─────────────────────────────────────────────────────────────
-- 2. ADD ROLE COLUMN WITH CONSTRAINT
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.profiles
    ADD COLUMN role TEXT NOT NULL DEFAULT 'customer';

ALTER TABLE public.profiles
    ADD CONSTRAINT chk_profile_role CHECK (role IN ('customer', 'admin', 'vendor'));

CREATE INDEX idx_profiles_role ON public.profiles (role);

-- ─────────────────────────────────────────────────────────────
-- 3. RENAME INDEXES (customers → profiles)
-- ─────────────────────────────────────────────────────────────
ALTER INDEX idx_customers_email RENAME TO idx_profiles_email;
ALTER INDEX idx_customers_phone RENAME TO idx_profiles_phone;

-- ─────────────────────────────────────────────────────────────
-- 4. RENAME TRIGGERS
-- ─────────────────────────────────────────────────────────────
ALTER TRIGGER trg_customers_updated ON public.profiles RENAME TO trg_profiles_updated;

-- ─────────────────────────────────────────────────────────────
-- 5. UPDATE handle_new_user() TO INSERT INTO profiles
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────
-- 6. HELPER FUNCTION: is_admin()
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin(check_uid UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = check_uid AND role = 'admin'
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Convenience overload for current user
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
    SELECT public.is_admin(auth.uid());
$$ LANGUAGE sql SECURITY DEFINER STABLE;
