import { Breadcrumbs, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/shopall.module.css'

/** Home / Shop All, the page's one h1 and its lead, and how many products the filters show (null while they load). */
export const CollectionHeader = ({ count }: { count: number | null }) => {
  const { t } = useStorefront()
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Breadcrumbs
          crumbs={[
            { label: t('shop.crumbs.home'), href: '/' },
            { label: t('shopall.header.crumb'), href: '/collections/all/' },
          ]}
          t={t}
          className={styles.crumbs}
        />
        <h1 className={styles.title}>{t('shopall.header.title')}</h1>
        <p className={styles.lead}>{t('shopall.header.lead')}</p>
        {count === null ? <span className={styles.headerCountPending} aria-hidden="true" /> : <p className={styles.headerCount}>{t('shopall.count.showing', { count })}</p>}
      </div>
    </header>
  )
}
