/**
 * Formata um valor monetário separando a parte inteira da decimal.
 * Essencial para o layout tipográfico dos centavos (design premium).
 */
export function formatCurrency(val: number) {
  const safeVal = val || 0;
  const [int, dec] = safeVal.toFixed(2).split('.');
  return { int, dec };
}