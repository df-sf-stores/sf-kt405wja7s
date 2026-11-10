'use client'

import { forwardRef } from 'react'
import { Select, useStorefront } from '@dripfunnel/storefront-core/theme'
import { formatAmount, noFilters, sortChoices, type ShopFilters, type SortChoice, type StockChoice } from '../shopFilters'
import type { Catalogue } from './shopCatalogue'
import styles from '../../styles/shopall.module.css'

/** The sort's choices in the shopper's words. */
export const useSortOptions = () => {
  const { t } = useStorefront()
  const labels: Record<SortChoice, string> = {
    featured: t('shopall.toolbar.sorts.featured'),
    'price-low': t('shopall.toolbar.sorts.priceLow'),
    'price-high': t('shopall.toolbar.sorts.priceHigh'),
    'name-az': t('shopall.toolbar.sorts.nameAz'),
    'name-za': t('shopall.toolbar.sorts.nameZa'),
    newest: t('shopall.toolbar.sorts.newest'),
  }
  return sortChoices.map((value) => ({ value, label: labels[value] }))
}

type ToolbarProps = {
  count: number
  /** How many filters are on. */
  active: number
  sort: SortChoice
  onSort: (sort: SortChoice) => void
  /** Set on narrow screens, where the filters are in the drawer this button opens. */
  onOpenFilters: (() => void) | null
}

/** How many products show and how many filters are on, then the sort, or on narrow screens the Filter & Sort button. */
export const ProductToolbar = forwardRef<HTMLButtonElement, ToolbarProps>(function ProductToolbar({ count, active, sort, onSort, onOpenFilters }, opener) {
  const { t } = useStorefront()
  const options = useSortOptions()
  return (
    <div className={styles.toolbar}>
      <p className={styles.showing} role="status">
        <span className={styles.showingCount}>{t('shopall.count.showing', { count })}</span>
        {active ? <span className={styles.activeCount}>{t('shopall.count.active', { count: active })}</span> : null}
      </p>
      {onOpenFilters ? (
        <button ref={opener} type="button" className={styles.filterButton} aria-haspopup="dialog" onClick={onOpenFilters}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          {t('shopall.toolbar.filterSort')}
          {active ? <span className={styles.filterBadge}>{active}</span> : null}
        </button>
      ) : (
        <Select label={t('shopall.toolbar.sort')} value={sort} options={options} onChange={onSort} className={styles.sort} />
      )}
    </div>
  )
})

/** Each filter that's on, as a chip that removes only that one, and Clear All when there's more than one. */
export const ActiveFilterChips = ({ catalogue, filters, onChange }: { catalogue: Catalogue; filters: ShopFilters; onChange: (filters: ShopFilters) => void }) => {
  const { t, locale } = useStorefront()
  const stockNames: Record<StockChoice, string> = { in: t('shopall.filters.inStock'), out: t('shopall.filters.outOfStock') }
  const words = filters.search.trim()
  const currency = catalogue.currency
  // Each chip is its words from content/, the shopper's own data beside them, or both (the search and the price range).
  const chips: { key: string; label: string | null; parts: string[]; remove: ShopFilters }[] = [
    ...(words ? [{ key: 'search', label: t('shopall.toolbar.searchChip'), parts: [words], remove: { ...filters, search: '' } }] : []),
    ...filters.collections.flatMap((slug) => {
      const name = catalogue.collections.find((c) => c.slug === slug)?.name
      return name ? [{ key: `collection-${slug}`, label: null, parts: [name], remove: { ...filters, collections: filters.collections.filter((s) => s !== slug) } }] : []
    }),
    ...(filters.price && currency
      ? [{ key: 'price', label: null, parts: [formatAmount(filters.price.min, currency, locale), formatAmount(filters.price.max, currency, locale)], remove: { ...filters, price: null } }]
      : []),
    ...filters.stock.map((choice) => ({ key: `stock-${choice}`, label: stockNames[choice], parts: [], remove: { ...filters, stock: filters.stock.filter((s) => s !== choice) } })),
  ]
  if (chips.length === 0) return null
  return (
    <ul className={styles.chips}>
      {chips.map((chip) => (
        <li key={chip.key}>
          <button type="button" className={styles.chip} onClick={() => onChange(chip.remove)}>
            <span className={styles.hidden}>{t('shopall.toolbar.removeLabel')}</span>
            {chip.label ? <span>{chip.label}</span> : null}
            {chip.parts.length === 2 ? (
              <span className={styles.chipRange}>
                <span>{chip.parts[0]}</span>
                <span className={styles.chipDash} aria-hidden="true" />
                <span className={styles.hidden}>{t('shopall.filters.priceTo')}</span>
                <span>{chip.parts[1]}</span>
              </span>
            ) : chip.parts[0] ? (
              <span>{chip.parts[0]}</span>
            ) : null}
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </li>
      ))}
      {chips.length > 1 ? (
        <li>
          <button type="button" className={styles.chipsClear} onClick={() => onChange(noFilters)}>
            {t('shopall.toolbar.clearAll')}
          </button>
        </li>
      ) : null}
    </ul>
  )
}
