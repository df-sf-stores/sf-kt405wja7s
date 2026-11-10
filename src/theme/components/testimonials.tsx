/**
 * The customer testimonials published from the client's twelve documents (TESTIMONIALS … .doc and प्रशंसापत्र … .docx),
 * in each document's own order. Each one's English and Hindi words are in content/en/testimonials.json under items.{id},
 * copied from the documents. Testimonials that claim a medical result or a change of medicine are held back for the
 * client's sign-off and are not in the content at all, so Diabetic Tea and Cough Tea have none here yet.
 */
export type ProductKey = 'herbal' | 'tulsi' | 'weightLoss' | 'ginger' | 'diabetic' | 'cough'

export type TestimonialId =
  | 'herbal_hema'
  | 'herbal_subuddhi'
  | 'herbal_srinjaya'
  | 'herbal_daamodara'
  | 'herbal_sarveshvar'
  | 'herbal_samrath'
  | 'herbal_ekta'
  | 'herbal_ganga'
  | 'herbal_rasikanand'
  | 'tulsi_ramesh'
  | 'tulsi_rajesh'
  | 'tulsi_ekta'
  | 'weightLoss_raghubir'
  | 'weightLoss_anup'
  | 'ginger_pradeep'

/** One testimonial; its product names its two source documents (TESTIMONIALS {PRODUCT}.doc, प्रशंसापत्र {PRODUCT}.docx). */
export type Testimonial = { id: TestimonialId; product: ProductKey }

export const testimonials: readonly Testimonial[] = [
  { id: 'herbal_hema', product: 'herbal' },
  { id: 'herbal_subuddhi', product: 'herbal' },
  { id: 'herbal_srinjaya', product: 'herbal' },
  { id: 'herbal_daamodara', product: 'herbal' },
  { id: 'herbal_sarveshvar', product: 'herbal' },
  { id: 'herbal_samrath', product: 'herbal' },
  { id: 'herbal_ekta', product: 'herbal' },
  { id: 'herbal_ganga', product: 'herbal' },
  { id: 'herbal_rasikanand', product: 'herbal' },
  { id: 'tulsi_ramesh', product: 'tulsi' },
  { id: 'tulsi_rajesh', product: 'tulsi' },
  { id: 'tulsi_ekta', product: 'tulsi' },
  { id: 'weightLoss_raghubir', product: 'weightLoss' },
  { id: 'weightLoss_anup', product: 'weightLoss' },
  { id: 'ginger_pradeep', product: 'ginger' },
]

/** The products, in the filter's order; only those with a published testimonial get a filter. */
const productOrder: readonly ProductKey[] = ['herbal', 'tulsi', 'ginger', 'weightLoss', 'diabetic', 'cough']

export const filterProducts = productOrder.filter((p) => testimonials.some((t) => t.product === p))

/** A few short stories for the featured carousel, all published ones. */
export const featured: readonly TestimonialId[] = ['herbal_sarveshvar', 'herbal_daamodara', 'tulsi_rajesh', 'ginger_pradeep', 'herbal_samrath']

/** Each product's own page on this store, so a product page links only to its own testimonials. */
const productHrefs = new Map<string, ProductKey>([
  ['/products/govind-madhav-herbal-tea/', 'herbal'],
  ['/products/govind-madhav-tulsi-tea/', 'tulsi'],
  ['/products/govind-madhav-ginger-tea/', 'ginger'],
  ['/products/govind-madhav-weight-loss-tea/', 'weightLoss'],
  ['/products/govind-madhav-diabetic-tea/', 'diabetic'],
  ['/products/govind-madhav-cough-tea/', 'cough'],
])

/** The product at `href`, when it has published testimonials; null otherwise. */
export const testimonialsForProduct = (href: string) => {
  const product = productHrefs.get(href)
  return product && filterProducts.includes(product) ? product : null
}

/** A `?product=` value, when it names a product with testimonials. */
export const productFromQuery = (value: string | null) => filterProducts.find((p) => p === value) ?? null

export type Language = 'en' | 'hi'

/** A words value's paragraphs, blank ones dropped. */
export const paragraphsOf = (words: string) =>
  words
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

/** A testimonial is shown in part, with Read More, past this many characters or when it has more than one paragraph. */
export const longAfter = 260

/** A page's own path on this store, slashes trimmed, so `/testimonials/` and `testimonials` both match. */
export const isTestimonialsPath = (path: string) => path.replace(/^\/+|\/+$/g, '').split('/').at(-1) === 'testimonials'
