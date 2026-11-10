import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import { reportForProduct, reportsPath } from '../labReports'
import styles from '../../styles/labreports.module.css'

/** A fine-line laboratory flask with a sprig, the page's mark. */
const Flask = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M44 20h32M50 20v40L22 128a8 8 0 007.4 11h61.2a8 8 0 007.4-11L70 60V20" />
    <path d="M32 104h56" />
    <path d="M60 104c-6-14 2-26 16-30-2 14-8 24-16 30zM60 104c2-12-4-22-14-26 0 12 5 21 14 26z" />
  </svg>
)

/** Section 1: the page's one h1 on deep forest green, the way to the reports and when they were issued. */
export const LaboratoryReportsHero = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.hero} aria-labelledby="reports-title">
      <Flask className={styles.heroArt} />
      <Flask className={styles.heroArtSmall} />
      <div className={styles.heroInner}>
        <p className={`${styles.heroEyebrow} ${styles.enter}`}>{t('labreports.hero.eyebrow')}</p>
        <h1 id="reports-title" className={`${styles.heroTitle} ${styles.enter} ${styles.delay1}`}>
          {t('labreports.hero.title')}
        </h1>
        <span className={`${styles.heroRule} ${styles.enter} ${styles.delay1}`} aria-hidden="true" />
        <p className={`${styles.heroLead} ${styles.enter} ${styles.delay2}`}>{t('labreports.hero.lead')}</p>
        <div className={`${styles.heroActions} ${styles.enter} ${styles.delay3}`}>
          <Link href="#reports" className={styles.buttonGold}>
            {t('labreports.hero.browse')}
          </Link>
          <p className={styles.heroIssued}>{t('labreports.hero.issued')}</p>
        </div>
      </div>
    </section>
  )
}

/** Section 2: what the reports are, in the documents' own terms, with four facts read from them. */
export const LaboratoryReportsIntro = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="reports-intro">
      <div className={styles.intro}>
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}>{t('labreports.intro.eyebrow')}</p>
          <h2 id="reports-intro" className={styles.title}>
            {t('labreports.intro.title')}
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.lead}>{t('labreports.intro.lead')}</p>
          <p className={styles.body}>{t('labreports.intro.body')}</p>
          <p className={styles.note}>{t('labreports.intro.note')}</p>
        </div>
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>{t('labreports.intro.labLabel')}</dt>
            <dd>{t('labreports.intro.lab')}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{t('labreports.intro.countLabel')}</dt>
            <dd>{t('labreports.intro.count')}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{t('labreports.intro.servingLabel')}</dt>
            <dd>{t('labreports.intro.serving')}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{t('labreports.intro.paramsLabel')}</dt>
            <dd>{t('labreports.intro.params')}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/** Section 4: questions about a report go to the contact page; or on to the products. */
export const LaboratoryReportsCTA = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.cta} aria-labelledby="reports-cta">
      <div className={styles.ctaInner}>
        <p className={styles.ctaEyebrow}>{t('labreports.cta.eyebrow')}</p>
        <h2 id="reports-cta" className={styles.ctaTitle}>
          {t('labreports.cta.title')}
        </h2>
        <p className={styles.ctaLead}>{t('labreports.cta.lead')}</p>
        <div className={styles.ctaActions}>
          <Link href="/contact/" className={styles.buttonGold}>
            {t('labreports.cta.contact')}
          </Link>
          <Link href="/collections/all/" className={styles.buttonGhost}>
            {t('labreports.cta.products')}
          </Link>
        </div>
      </div>
    </section>
  )
}

/**
 * On a product's page: its own laboratory report, opened in the reports page's viewer. Nothing shows for a product with
 * no report, or until that report's image is uploaded, so no product links to another's report or to an empty card.
 */
export const ProductLabReport = ({ href, className, titleClassName }: { href: string; className?: string; titleClassName?: string }) => {
  const { t } = useStorefront()
  const key = reportForProduct(href)
  if (!key || !uploaded(t(`labreports.assets.${key}` as const))) return null
  return (
    <section className={className} aria-labelledby="product-lab-report">
      <h2 id="product-lab-report" className={titleClassName}>
        {t('labreports.product.title')}
      </h2>
      <p className={styles.productLead}>{t('labreports.product.lead')}</p>
      <Link href={reportsPath(key)} className={styles.productLink}>
        {t(`labreports.items.${key}.viewLabel` as const)}
      </Link>
    </section>
  )
}
