/**
 * The six certificate pictures the client approved for the site, one card each, in the order the gallery shows them.
 * Each one's words are in content/en/certificates.json under items.{key}, and its Storefront › Assets id under assets.{key}
 * ("pending" until the id is written in).
 */
export type CertificateKey = 'recognition' | 'msme' | 'trademark' | 'register' | 'gst' | 'fssai'

export const certificates: readonly CertificateKey[] = ['recognition', 'msme', 'trademark', 'register', 'gst', 'fssai']

/** The five trust indicators under the hero; the trademark's e-register record shares the trademark's. */
export type HighlightKey = 'recognition' | 'msme' | 'trademark' | 'gst' | 'fssai'

export const highlights: readonly HighlightKey[] = ['recognition', 'msme', 'trademark', 'gst', 'fssai']

/** Which line icon a certificate wears. */
export const iconOf = (key: CertificateKey): HighlightKey => (key === 'register' ? 'trademark' : key)

/** The address the Shop API serves an asset's original file from, for the shopper to open and keep. */
export const fileOf = (id: string) => `/shop-api/assets/${id}`

/** A page's own path on this store, slashes trimmed, so `/certificates/` and `certificates` both match. */
export const isCertificatesPath = (path: string) => path.replace(/^\/+|\/+$/g, '').split('/').at(-1) === 'certificates'
