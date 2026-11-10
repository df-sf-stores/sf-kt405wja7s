import { StoreLogo, useStorefront } from '@dripfunnel/storefront-core/theme'
import { BrandMark } from './BrandMark'
import styles from '../styles/site.module.css'

/**
 * The brand in the header and the footer: the logo uploaded in Storefront › Site settings, through core's StoreLogo,
 * shown whole at its own proportions and never redrawn or recoloured. Site settings is the one place it's set; a new
 * upload shows on the next load. Only a store with no logo uploaded falls back to the line-drawn mark and its name.
 */
export const BrandLockup = ({ place }: { place: 'header' | 'footer' }) => {
  const { store } = useStorefront()
  const header = place === 'header'
  if (store.logo)
    return (
      <span className={header ? styles.logoHeader : styles.logoFooter}>
        <StoreLogo className={styles.logoImage} />
      </span>
    )
  return (
    <>
      <BrandMark className={header ? styles.brandMark : styles.footerMark} leafClassName={styles.brandLeaf} />
      <span className={header ? styles.brandName : undefined}>{store.name}</span>
    </>
  )
}
