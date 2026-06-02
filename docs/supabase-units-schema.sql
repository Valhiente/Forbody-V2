-- Ainda não executar automaticamente.
-- SQL inicial para futura migração manual no Supabase.

CREATE TABLE units (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    address TEXT,
    status TEXT,
    evo_id INTEGER,
    evo_unit_id INTEGER,
    sales_url TEXT,
    student_area_url TEXT,
    location_url TEXT,
    google_place_id TEXT,
    google_reviews_score NUMERIC,
    google_reviews_count INTEGER,
    whatsapp TEXT,
    instagram TEXT,
    map_embed_url TEXT,
    business_hours JSONB DEFAULT '[]',
    gallery_urls JSONB DEFAULT '[]',
    teachers JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
