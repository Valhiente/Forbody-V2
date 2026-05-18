-- Criação da tabela principal de Unidades (ForBody OS)
CREATE TABLE IF NOT EXISTS public.units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Dados de Identificação
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    address TEXT,
    
    -- Status e Controle
    status TEXT DEFAULT 'active', -- 'active', 'coming_soon', 'maintenance'
    coming_soon BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    opening_date DATE,
    evo_id INTEGER,
    
    -- Contato e Redes
    whatsapp TEXT,
    instagram TEXT,
    
    -- SEO Local e Mapas
    google_place_id TEXT,
    gmaps_url TEXT,
    map_embed_url TEXT,
    google_rating NUMERIC(3,1),
    google_reviews_count INTEGER,
    
    -- Estrutura Visual (JSONB e Arrays)
    business_hours JSONB,
    gallery_urls TEXT[],
    
    -- Timestamps Automáticos
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índice de Performance: Acelera as buscas dinâmicas do SSG Next.js
CREATE INDEX IF NOT EXISTS idx_units_slug ON public.units(slug);