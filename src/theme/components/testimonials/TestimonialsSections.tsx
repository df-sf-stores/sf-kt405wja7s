import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { testimonialsForProduct } from '../testimonials'
import styles from '../../styles/testimonials.module.css'

/** A fine-line sprig of leaves, the page's botanical mark. */
const Sprig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M60 158C58 110 62 60 88 6" />
    <path d="M61 128c-18-4-30-16-34-34 18 2 31 14 34 34zM62 100c16-6 26-19 28-36-16 4-27 17-28 36zM64 72c-14-6-22-18-22-33 14 5 21 17 22 33zM70 46c12-6 19-16 20-29-12 4-19 14-20 29z" />
  </svg>
)

/** Section 1: the page's one h1 on forest green, with the way to the stories. No figures: the client gave none. */
export const TestimonialsHero = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.hero} aria-labelledby="testimonials-title">
      <Sprig className={styles.heroSprig} />
      <Sprig className={styles.heroSprigRight} />
      <div className={styles.heroInner}>
        <p className={`${styles.heroEyebrow} ${styles.enter}`}>{t('testimonials.hero.eyebrow')}</p>
        <h1 id="testimonials-title" className={`${styles.heroTitle} ${styles.enter} ${styles.delay1}`}>
          {t('testimonials.hero.title')}
        </h1>
        <span className={`${styles.heroRule} ${styles.enter} ${styles.delay1}`} aria-hidden="true" />
        <p className={`${styles.heroLead} ${styles.enter} ${styles.delay2}`}>{t('testimonials.hero.lead')}</p>
        <div className={`${styles.heroActions} ${styles.enter} ${styles.delay3}`}>
          <Link href="#testimonials" className={styles.buttonGold}>
            {t('testimonials.hero.browse')}
          </Link>
        </div>
      </div>
    </section>
  )
}

/** The note under the testimonials: individual experiences, not medical advice, and never a reason to change medicine. */
export const TestimonialsDisclaimer = () => {
  const { t } = useStorefront()
  return (
    <aside className={styles.disclaimer} aria-labelledby="testimonials-disclaimer">
      <p id="testimonials-disclaimer" className={styles.disclaimerTitle}>
        {t('testimonials.disclaimer.title')}
      </p>
      <p className={styles.disclaimerText}>{t('testimonials.disclaimer.text')}</p>
      <p className={styles.disclaimerText}>{t('testimonials.disclaimer.medicine')}</p>
    </aside>
  )
}

/** The closing band: on to the teas, or to how to prepare them. */
export const TestimonialsCTA = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.cta} aria-labelledby="testimonials-cta">
      <Sprig className={styles.ctaSprig} />
      <div className={styles.ctaInner}>
        <h2 id="testimonials-cta" className={styles.ctaTitle}>
          {t('testimonials.cta.title')}
        </h2>
        <p className={styles.ctaLead}>{t('testimonials.cta.lead')}</p>
        <div className={styles.ctaActions}>
          <Link href="/collections/all/" className={styles.buttonGold}>
            {t('testimonials.cta.shop')}
          </Link>
          <Link href="/herbal-tea-recipes/" className={styles.buttonGhost}>
            {t('testimonials.cta.recipes')}
          </Link>
        </div>
      </div>
    </section>
  )
}

/** On a product's page: its own customers' testimonials. Nothing shows for a product with none published. */
export const ProductTestimonialsLink = ({ href, className, titleClassName }: { href: string; className?: string; titleClassName?: string }) => {
  const { t } = useStorefront()
  const product = testimonialsForProduct(href)
  if (!product) return null
  return (
    <section className={className} aria-labelledby="product-testimonials">
      <h2 id="product-testimonials" className={titleClassName}>
        {t('testimonials.product.title')}
      </h2>
      <p className={styles.productLead}>{t('testimonials.product.lead')}</p>
      <Link href={`/testimonials/?product=${product}#testimonials`} className={styles.productLink}>
        {t(`testimonials.product.links.${product}` as const)}
      </Link>
    </section>
  )
}
