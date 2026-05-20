export type Database = {
  public: {
    Tables: {
      units: {
        Row: {
          id: string;
          google_rating: number | null;
          google_reviews_count: number | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          google_rating?: number | null;
          google_reviews_count?: number | null;
          updated_at?: string | null;
        };
        Update: {
          google_rating?: number | null;
          google_reviews_count?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };