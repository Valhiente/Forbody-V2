import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const pillars = [
  "Musculação completa",
  "Bons profissionais",
  "Aulas coletivas",
  "Planos acessíveis",
];

const fallbackShowcaseCards = [
  {
    eyebrow: "Estrutura",
    title: "Equipamentos para treinar com mais resultado.",
    description: "A Forbody oferece uma