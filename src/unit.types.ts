export type UnitStatus = 'draft' | 'coming_soon' | 'pre_launch' | 'active' | 'maintenance' | 'hidden' | 'archived' | 'blocked';

export interface UnitListItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  status: UnitStatus;
  evoId: number | null;
  googlePlaceId: string | null;
}