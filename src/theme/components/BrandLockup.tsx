import { MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from './assets'
import { BrandMark } from './BrandMark'
import styles from '../styles/site.module.css'

/**
 * The brand in the header and the footer. Once the original Govind Madhav logo is uploaded to Storefront › Assets and its
 * id is in content/en/common.json under brand.logo, the logo itself shows, with the store's name for screen readers.
 * Until then the line-drawn mark (its leaf in the logo's green) shows beside the store's name, as before.
 */
export const BrandLockup = ({ place }: { place: 'header' | 'footer' }) => {
  const { store, t } = useStorefront()
  const logo = uploaded(t('common.brand.logo'))
  const header = place === 'header'
  if (logo)
    return (
      <span className={header ? styles.logoHeader : styles.logoFooter}>
        <MerchantImage asset={logo} alt={t('common.brand.logoAlt', { store: store.name })} ratio={2.2} sizes={header ? '180px' : '220px'} className={styles.logoImage} />
      </span>
    )
  return (
    <>
      <BrandMark className={header ? styles.brandMark : styles.footerMark} leafClassName={styles.brandLeaf} />
      <span className={header ? styles.brandName : undefined}>{store.name}</span>
    </>
  )
}
