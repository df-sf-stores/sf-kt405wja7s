import { MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from './assets'
import styles from '../styles/site.module.css'

/**
 * "Powered by DripFunnel" at the foot of every page, with the DripFunnel logo from Storefront › Assets once its id is
 * written in content/en/common.json `footer.credit.logo`; until then, the words alone. It is not a link: a theme may
 * not write another site's address (code/url-in-code), so the words carry the credit.
 */
export const DripFunnelCredit = ({ className }: { className?: string }) => {
  const { t } = useStorefront()
  const logo = uploaded(t('common.footer.credit.logo'))
  return (
    <p className={className ? `${styles.credit} ${className}` : styles.credit}>
      {logo ? <MerchantImage asset={logo} alt="" ratio={4} sizes="96px" className={styles.creditLogo} /> : null}
      <span>{t('common.footer.credit.text')}</span>
    </p>
  )
}
