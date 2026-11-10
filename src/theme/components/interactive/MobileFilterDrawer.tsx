'use client'

import { useEffect, useRef, type KeyboardEvent } from 'react'
import { Select, useStorefront } from '@dripfunnel/storefront-core/theme'
import { activeCount, type ShopFilters, type SortChoice } from '../shopFilters'
import type { Catalogue } from './shopCatalogue'
import { ProductFilterPanel } from './ShopFilterPanel'
import { useSortOptions } from './ShopToolbar'
import styles from '../../styles/shopall.module.css'

type DrawerProps = {
  catalogue: Catalogue
  filters: ShopFilters
  onChange: (filters: ShopFilters) => void
  onClear: () => void
  sort: SortChoice
  onSort: (sort: SortChoice) => void
  /** How many products the filters as they stand would show, for the Apply button. */
  count: number
  onClose: () => void
}

/**
 * Filter & Sort on narrow screens: a sheet over the page with the sort, every filter, and Clear All and Apply kept in view
 * at its foot. Filters take effect as they change, so closing it any way keeps them; Escape and the close button close it.
 */
export const MobileFilterDrawer = ({ catalogue, filters, onChange, onClear, sort, onSort, count, onClose }: DrawerProps) => {
  const { t } = useStorefront()
  const options = useSortOptions()
  const close = useRef<HTMLButtonElement>(null)
  const apply = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    close.current?.focus()
  }, [])
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
    }
    // Focus stays in the sheet while it's open: Tab past Apply returns to Close, Shift+Tab before Close goes to Apply.
    if (event.key === 'Tab' && event.shiftKey && event.target === close.current) {
      event.preventDefault()
      apply.current?.focus()
    } else if (event.key === 'Tab' && !event.shiftKey && event.target === apply.current) {
      event.preventDefault()
      close.current?.focus()
    }
  }
  return (
    <div className={styles.drawerLayer} onKeyDown={keys}>
      <button type="button" className={styles.scrim} tabIndex={-1} aria-label={t('shopall.drawer.close')} onClick={onClose} />
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="shop-drawer-title">
        <div className={styles.drawerHead}>
          <h2 id="shop-drawer-title" className={styles.drawerTitle}>
            {t('shopall.drawer.title')}
          </h2>
          <button ref={close} type="button" className={styles.drawerClose} aria-label={t('shopall.drawer.close')} onClick={onClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className={styles.drawerBody}>
          <div className={styles.group}>
            <Select label={t('shopall.drawer.sort')} value={sort} options={options} onChange={onSort} className={styles.sort} />
          </div>
          <ProductFilterPanel catalogue={catalogue} filters={filters} onChange={onChange} onClear={null} />
        </div>
        <div className={styles.drawerFoot}>
          <button type="button" className={styles.drawerClear} disabled={activeCount(filters) === 0} onClick={onClear}>
            {t('shopall.toolbar.clearAll')}
          </button>
          <button ref={apply} type="button" className={styles.drawerApply} onClick={onClose}>
            {t('shopall.count.matching', { count })}
          </button>
        </div>
      </div>
    </div>
  )
}
