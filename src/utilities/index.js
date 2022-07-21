/**
 * @function formatCurrency
 * Format number as currency (US Dollars)
 *
 * @param {number} count
 * @returns {string} number formatted as currency
 *
 * @example
 *    formatCurrenct(0)
 *    / => $0.00
 *
 * @example
 *    formatCurrenct(1.5)
 *    / => $1.50
 */

// format number as currency
export function formatCurrency(currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(currency);
}
