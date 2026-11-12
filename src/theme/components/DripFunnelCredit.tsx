import { Link, ThemeImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../styles/site.module.css'

/** The logo file's own shape (845 × 143), so the box keeps it and nothing is cropped. */
const LOGO_RATIO = 845 / 143

/**
 * "Powered by" and the DripFunnel logo, side by side at the foot of every page, the whole of it one link to DripFunnel's
 * site. The logo is the theme's own src/theme/media/dripfunnel.png with "DripFunnel" as its alt text, so the link reads
 * "Powered by DripFunnel". The address lives in content/en/common.json because a theme writes none in its code
 * (code/url-in-code); core's <Link> renders it.
 */
export const DripFunnelCredit = ({ className }: { className?: string }) => {
  const { t } = useStorefront()
  return (
    <Link href={t('common.footer.credit.href')} className={className ? `${styles.credit} ${className}` : styles.credit}>
      <span className={styles.creditLabel}>{t('common.footer.credit.label')}</span>
      <ThemeImage src="dripfunnel.png" alt={t('common.footer.credit.logoAlt')} ratio={LOGO_RATIO} sizes="110px" className={styles.creditLogo} />
    </Link>
  )
}
