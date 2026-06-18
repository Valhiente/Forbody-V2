-- Schema canônico da tabela de unidades usado pelo Forbody-V2.
-- Mantém o mesmo formato esperado por src/services/units.service.ts.

CREATE TABLE IF NOT EXISTS public.units (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    city TEXT DEFAULT 'Ribeirão Preto',
    state TEXT DEFAULT 'SP',
    address TEXT DEFAULT '',
    status TEXT DEFAULT 'coming_soon' CHECK (status IN ('active', 'coming_soon', 'maintenance', 'hidden')),

    evo_id INTEGER,
    evo_unit_id INTEGER,

    whatsapp TEXT DEFAULT '',
    instagram TEXT DEFAULT '',

    sales_url TEXT DEFAULT '',
    student_area_url TEXT DEFAULT '',
    checkout_url TEXT DEFAULT '',
    location_url TEXT DEFAULT '',

    google_place_id TEXT DEFAULT '',
    map_embed_url TEXT DEFAULT '',
    google_reviews_score NUMERIC(3,1) DEFAULT 0,
    google_reviews_count INTEGER DEFAULT 0,

    business_hours JSONB DEFAULT '[]'::jsonb,
    gallery_urls JSONB DEFAULT '[]'::jsonb,
    teachers JSONB DEFAULT '[]'::jsonb,

    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_units_slug ON public.units(slug);
CREATE INDEX IF NOT EXISTS idx_units_status ON public.units(status);
