import type { Unit } from '@/app/index';

export type UnitStatus = 'active' | 'coming_soon' | 'maintenance' | 'hidden';

export const UNIT_STATUS_LABELS: Record<UnitStatus, string> = {
  active: 'Ativa',
  coming_soon: 'Em breve',
  maintenance: 'Em manutenção',
  hidden: 'Oculta',
};

export const UNIT_STATUS_BADGE_CLASSES: Record<UnitStatus, string> = {
  active: 'bg-green-600/20 text-green-400 border-green-600/20',
  coming_soon: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/20',
  maintenance: 'bg-orange-600/20 text-orange-400 border-orange-600/20',
  hidden: 'bg-gray-600/20 text-gray-400 border-gray-600/20',
};

export function getUnitStatus(status?: Unit['status']): UnitStatus {
  if (status === 'active' || status === 'coming_soon' || status === 'maintenance' || status === 'hidden') {
    return status;
  }

  return 'coming_soon';
}

export function isPubliclyVisible(unit: Pick<Unit, 'status'>): boolean {
  return getUnitStatus(unit.status) !== 'hidden';
}

export function isActiveUnit(unit: Pick<Unit, 'status'>): boolean {
  return getUnitStatus(unit.status) === 'active';
}

export function isMaintenanceUnit(unit: Pick<Unit, 'status'>): boolean {
  return getUnitStatus(unit.status) === 'maintenance';
}

export function isComingSoonUnit(unit: Pick<Unit, 'status'>): boolean {
  return getUnitStatus(unit.status) === 'coming_soon';
}

export function getUnitStatusLabel(status?: Unit['status']): string {
  return UNIT_STATUS_LABELS[getUnitStatus(status)];
}

export function getUnitStatusBadgeClasses(status?: Unit['status']): string {
  return UNIT_STATUS_BADGE_CLASSES[getUnitStatus(status)];
}

export function hasValidUrl(url?: string | null): boolean {
  if (!url) return false;

  const normalizedUrl = url.trim();

  if (!normalizedUrl || normalizedUrl === '#') return false;

  return normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://');
}

export function canShowSalesCta(unit: Pick<Unit, 'status' | 'salesUrl' | 'studentAreaUrl' | 'checkoutUrl'>): boolean {
  const status = getUnitStatus(unit.status);

  if (status === 'hidden' || status === 'maintenance') return false;

  if (status === 'coming_soon') {
    return hasValidUrl(unit.salesUrl) || hasValidUrl(unit.studentAreaUrl) || hasValidUrl(unit.checkoutUrl);
  }

  return hasValidUrl(unit.salesUrl) || hasValidUrl(unit.studentAreaUrl) || hasValidUrl(unit.checkoutUrl);
}
