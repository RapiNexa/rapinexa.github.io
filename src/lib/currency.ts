/**
 * Formats a Rupiah amount using Indonesian grouping (period as the
 * thousands separator), e.g. `1499000` -> `"Rp1.499.000"`.
 */
export function formatRupiah(amount: number): string {
  return `Rp${new Intl.NumberFormat("id-ID").format(amount)}`;
}

/**
 * Formats a Starting price (CONTEXT.md), e.g. `500000` ->
 * `"mulai dari Rp500.000"`.
 */
export function formatStartingPrice(amount: number): string {
  return `mulai dari ${formatRupiah(amount)}`;
}
