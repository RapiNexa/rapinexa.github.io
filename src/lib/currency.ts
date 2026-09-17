/**
 * Indonesian-format Rupiah formatting. This is the *only* place a Rupiah
 * amount is turned into a string — Service/Bundle cards call these helpers
 * and never format a `number` inline themselves, so the thousands separator
 * and "mulai dari" wording stay consistent everywhere they're used.
 */

/**
 * Formats a Rupiah amount using Indonesian grouping (period as the
 * thousands separator), e.g. `1499000` -> `"Rp1.499.000"`.
 */
export function formatRupiah(amount: number): string {
  return `Rp${new Intl.NumberFormat("id-ID").format(amount)}`;
}

/**
 * Formats a Service's Starting price (CONTEXT.md: "the lowest price at
 * which a Service is offered"), e.g. `249000` -> `"mulai dari Rp249.000"`.
 * Never used for a Bundle's price, which is a fixed total, not a Starting
 * price.
 */
export function formatStartingPrice(amount: number): string {
  return `mulai dari ${formatRupiah(amount)}`;
}
