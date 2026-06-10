import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { updateMarketingManagerAction } from './actions';

const fallbackSections = {
  home_hero: {
    section_key: 'home_hero',
    title: 'Forbody, feita para cada etapa da sua vida.',
    subtitle: 'Forbody Academia',
    description: 'Na Forbody, ajudamos você a conquistar seus objetivos, porque cada conquista sua também é nossa.',
    image_url: 'https://images.unsplash.com/photo-1571902943202