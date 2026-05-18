-- 1. Criação do tipo ENUM para as Roles Enterprise
CREATE TYPE public.user_role AS ENUM ('super_admin', 'admin', 'franchise_owner', 'marketing');

-- 2. Tabela de Perfis estendendo o auth.users do Supabase
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role user_role DEFAULT 'franchise_owner'::user_role NOT NULL,
    full_name TEXT,
    unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL, -- Se for dono de franquia, trava nesta unidade
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar RLS (Row Level Security) para blindagem no banco
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;

-- 4. Trigger Automática: Cria um profile vazio sempre que um Auth User nascer
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'franchise_owner');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();