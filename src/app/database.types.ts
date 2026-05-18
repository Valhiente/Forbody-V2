export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'super_admin' | 'admin' | 'franchise_owner' | 'marketing';
          full_name: string | null;
          unit_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'> & { created_at?: string };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      units: {
        Row: {
          id: string; // UUID
          slug: string;
          name: string;
          city: string;
          state: string;
          status: 'draft' | 'coming_soon' | 'pre_launch' | 'active' | 'maintenance' | 'hidden' | 'archived' | 'blocked';
          evo_id: number | null;
          address: string;
          whatsapp: string | null;
          instagram: string | null;
          map_embed_url: string | null;
          business_hours: Json | null; // Array of { day: string, hours: string }
          gallery_urls: string[] | null; // URLs vindas do Supabase Storage
          google_place_id: string | null;
          google_rating: number | null;
          google_reviews_count: number | null;
          gmaps_url: string | null;
          opening_date: string | null;
          coming_soon: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['units']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Database['public']['Tables']['units']['Insert']>;
      };
      plans: {
        Row: {
          id: string; // UUID
          unit_id: string | null; // Se null, é plano global da rede
          name: string;
          description: string | null;
          price: number;
          is_highlighted: boolean;
          features: string[]; // JSONB ou Text Array
          checkout_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['plans']['Row'], 'id' | 'created_at'> & { id?: string };
        Update: Partial<Database['public']['Tables']['plans']['Insert']>;
      };
    };
    Views: {};
    Functions: {};
  };
}