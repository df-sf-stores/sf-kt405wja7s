import { Link, ThemeImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../styles/site.module.css'

/** The logo file's own shape (845 × 143), so the box keeps it and nothing is cropped. */
const LOGO_RATIO = 845 / 143

/**
 * The DripFunnel logo at the foot of every page, linked to DripFunnel's site, right after core's sealed "Powered by"
 * line (which the platform requires while the store's plan shows it, so the words come from there, once). The logo is
 * the theme's own src/theme/media/dripfunnel.png with "DripFunnel" as its alt text. The address lives in
 * content/en/common.json because a theme writes none in its code (code/url-in-code); core's <Link> renders it.
 */
export const DripFunnelCredit = ({ className }: { className?: string }) => {
  const { t } = useStorefront()
  return (
    <Link href={t('common.footer.credit.href')} className={className ? `${styles.credit} ${className}` : styles.credit}>
      <ThemeImage src="dripfunnel.png" alt={t('common.footer.credit.logoAlt')} ratio={LOGO_RATIO} sizes="110px" className={styles.creditLogo} />
    </Link>
  )
}
