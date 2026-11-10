/**
 * The six ETRL laboratory test reports the client supplied, one per product, in the order the gallery shows them. Each
 * one's words (product, report number, issue date) are in content/en/labreports.json under items.{key}, read from the
 * original report, and its Storefront › Assets id is under assets.{key} ("pending" until the report's image is uploaded).
 */
export type ReportKey = 'tulsi' | 'ginger' | 'diabetic' | 'cough' | 'herbal' | 'weightLoss'

export const reports: readonly ReportKey[] = ['tulsi', 'ginger', 'diabetic', 'cough', 'herbal', 'weightLoss']

/** Each report's product, by the product's own address on this store, so a product page links only to its own report. */
const productReports = new Map<string, ReportKey>([
  ['/products/govind-madhav-tulsi-tea/', 'tulsi'],
  ['/products/govind-madhav-ginger-tea/', 'ginger'],
  ['/products/govind-madhav-diabetic-tea/', 'diabetic'],
  ['/products/govind-madhav-cough-tea/', 'cough'],
  ['/products/govind-madhav-herbal-tea/', 'herbal'],
  ['/products/govind-madhav-weight-loss-tea/', 'weightLoss'],
])

/** The report for the product at `href`, or null for a product with no report. */
export const reportForProduct = (href: string) => productReports.get(href) ?? null

/** The report a `?report=` value names, or null. */
export const reportFromQuery = (value: string | null) => reports.find((key) => key === value) ?? null

/** The page's address, opening the viewer on one report when `key` is given. */
export const reportsPath = (key?: ReportKey) => (key ? `/laboratory-test-reports/?report=${key}` : '/laboratory-test-reports/')

/** A page's own path on this store, slashes trimmed, so `/laboratory-test-reports/` and `laboratory-test-reports` both match. */
export const isReportsPath = (path: string) => path.replace(/^\/+|\/+$/g, '').split('/').at(-1) === 'laboratory-test-reports'
