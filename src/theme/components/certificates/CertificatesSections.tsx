import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { CertificateIcon } from '../CertificateIcon'
import { Ornament } from '../Ornament'
import { highlights } from '../certificates'
import styles from '../../styles/certificates.module.css'

/** A leafy sprig drawn in a fine line, for the hero's and the closing band's corners. */
export const Sprig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M60 158C58 110 62 60 88 6" />
    <path d="M61 128c-18-4-30-16-34-34 18 2 31 14 34 34zM62 100c16-6 26-19 28-36-16 4-27 17-28 36zM64 72c-14-6-22-18-22-33 14 5 21 17 22 33zM70 46c12-6 19-16 20-29-12 4-19 14-20 29z" />
  </svg>
)

/** The page's one h1 on deep forest green. */
export const CertificatesHero = () => {
  const { t } = useStorefront()
  return (
    <header className={styles.hero}>
      <Sprig className={styles.sprigLeft} />
      <Sprig className={styles.sprigRight} />
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>{t('certificates.hero.eyebrow')}</p>
        <h1 className={styles.heroTitle}>{t('certificates.hero.title')}</h1>
        <Ornament className={styles.heroOrnament} />
        <p className={styles.heroLead}>{t('certificates.hero.lead')}</p>
      </div>
    </header>
  )
}

/** Five small trust indicators, overlapping the hero's lower edge. */
export const TrustIndicators = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.highlights} aria-label={t('certificates.highlights.label')}>
      <ul className={styles.highlightList}>
        {highlights.map((key) => (
          <li key={key} className={styles.highlight}>
            <span className={styles.highlightBadge}>
              <CertificateIcon kind={key} className={styles.highlightIcon} />
            </span>
            <span>{t(`certificates.highlights.${key}` as const)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** The closing band before the footer, with the way to the brand's story and its teas. */
export const CertificatesCTA = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.cta} aria-labelledby="certificates-cta">
      <Sprig className={styles.ctaSprig} />
      <div className={styles.ctaInner}>
        <h2 id="certificates-cta" className={styles.ctaTitle}>
          {t('certificates.cta.title')}
        </h2>
        <Ornament className={styles.heroOrnament} />
        <p className={styles.ctaLead}>{t('certificates.cta.lead')}</p>
        <div className={styles.ctaActions}>
          <Link href="/about/" className={styles.ctaPrimary}>
            {t('certificates.cta.about')}
          </Link>
          <Link href="/collections/all/" className={styles.ctaSecondary}>
            {t('certificates.cta.products')}
          </Link>
        </div>
      </div>
    </section>
  )
}
