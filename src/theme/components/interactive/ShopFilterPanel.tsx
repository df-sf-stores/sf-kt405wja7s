'use client'

import type { ReactNode } from 'react'
import { Checkbox, TextField, useStorefront } from '@dripfunnel/storefront-core/theme'
import { activeCount, collectionCounts, formatAmount, stockChoices, stockCounts, type ShopFilters, type StockChoice } from '../shopFilters'
import { PriceRangeSlider } from './PriceRangeSlider'
import type { Catalogue } from './shopCatalogue'
import styles from '../../styles/shopall.module.css'

type PanelProps = { catalogue: Catalogue; filters: ShopFilters; onChange: (filters: ShopFilters) => void }

/** One group of the panel: its heading and its controls. */
const FilterGroup = ({ title, children }: { title: string; children: ReactNode }) => (
  <div role="group" aria-label={title} className={styles.group}>
    <h3 className={styles.groupTitle}>{title}</h3>
    {children}
  </div>
)

/** Search Products: narrows the products by name as the shopper types, with a button to empty it. */
export const SearchFilter = ({ filters, onChange }: Omit<PanelProps, 'catalogue'>) => {
  const { t } = useStorefront()
  return (
    <FilterGroup title={t('shopall.filters.search')}>
      <div className={styles.search}>
        <TextField label={t('shopall.filters.search')} hint={t('shopall.filters.searchHint')} value={filters.search} onChange={(search) => onChange({ ...filters, search })} maxLength={80} className={styles.searchField} />
        {filters.search ? (
          <button type="button" className={styles.searchClear} aria-label={t('shopall.filters.clearSearch')} onClick={() => onChange({ ...filters, search: '' })}>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        ) : null}
      </div>
    </FilterGroup>
  )
}

/** Categories: the store's collections, several at once, each with how many products choosing it would show. */
export const CategoryFilter = ({ catalogue, filters, onChange }: PanelProps) => {
  const { t } = useStorefront()
  const count = collectionCounts(catalogue.items, filters)
  const toggle = (slug: string, on: boolean) => onChange({ ...filters, collections: on ? [...filters.collections, slug] : filters.collections.filter((s) => s !== slug) })
  return (
    <FilterGroup title={t('shopall.filters.categories')}>
      <div className={styles.options}>
        {catalogue.collections.map((c) => {
          const n = count(c.slug)
          const on = filters.collections.includes(c.slug)
          return (
            <Checkbox key={c.slug} checked={on} onChange={(checked) => toggle(c.slug, checked)} className={n === 0 && !on ? `${styles.option} ${styles.optionEmpty}` : styles.option}>
              <span className={styles.optionName}>{c.name}</span>
              {catalogue.detailsReady ? <span className={styles.optionCount}>{n}</span> : <span className={`${styles.optionCount} ${styles.countPending}`} aria-hidden="true" />}
            </Checkbox>
          )
        })}
      </div>
    </FilterGroup>
  )
}

/** Availability: in stock and out of stock, from the Shop API's stock for each product. */
export const AvailabilityFilter = ({ catalogue, filters, onChange }: PanelProps) => {
  const { t } = useStorefront()
  const count = stockCounts(catalogue.items, filters)
  const names: Record<StockChoice, string> = { in: t('shopall.filters.inStock'), out: t('shopall.filters.outOfStock') }
  const toggle = (choice: StockChoice, on: boolean) => onChange({ ...filters, stock: on ? [...filters.stock, choice] : filters.stock.filter((s) => s !== choice) })
  return (
    <FilterGroup title={t('shopall.filters.availability')}>
      <div className={styles.options}>
        {stockChoices.map((choice) => {
          const n = count(choice)
          const on = filters.stock.includes(choice)
          return (
            <Checkbox key={choice} checked={on} onChange={(checked) => toggle(choice, checked)} className={n === 0 && !on ? `${styles.option} ${styles.optionEmpty}` : styles.option}>
              <span className={styles.optionName}>{names[choice]}</span>
              <span className={styles.optionCount}>{n}</span>
            </Checkbox>
          )
        })}
      </div>
    </FilterGroup>
  )
}

/**
 * Price Range: the slider and typed prices, between the lowest and highest price the cards show. While every product
 * shows the same price there is nothing to narrow, so it says that price instead.
 */
export const PriceFilter = ({ catalogue, filters, onChange }: PanelProps) => {
  const { t, locale } = useStorefront()
  const { bounds, currency } = catalogue
  if (catalogue.status === 'ready' && bounds && currency && bounds.min === bounds.max)
    return (
      <FilterGroup title={t('shopall.filters.price')}>
        <p className={styles.priceSingle}>
          <span>{t('shopall.filters.priceSingle')}</span>
          <strong>{formatAmount(bounds.min, currency, locale)}</strong>
        </p>
      </FilterGroup>
    )
  return (
    <FilterGroup title={t('shopall.filters.price')}>
      {bounds && currency && catalogue.status === 'ready' ? (
        <PriceRangeSlider
          bounds={bounds}
          currency={currency}
          value={filters.price ?? bounds}
          onChange={(range) => onChange({ ...filters, price: range.min <= bounds.min && range.max >= bounds.max ? null : range })}
        />
      ) : (
        <p className={styles.muted}>{t('shopall.filters.priceLoading')}</p>
      )}
    </FilterGroup>
  )
}

/** Every filter in order, then Clear All Filters; the sidebar on wide screens and the drawer's body on narrow ones. */
export const ProductFilterPanel = ({ catalogue, filters, onChange, onClear }: PanelProps & { onClear: (() => void) | null }) => {
  const { t } = useStorefront()
  return (
    <div className={styles.panel}>
      <SearchFilter filters={filters} onChange={onChange} />
      <CategoryFilter catalogue={catalogue} filters={filters} onChange={onChange} />
      <PriceFilter catalogue={catalogue} filters={filters} onChange={onChange} />
      <AvailabilityFilter catalogue={catalogue} filters={filters} onChange={onChange} />
      {onClear ? (
        <button type="button" className={styles.clearAll} disabled={activeCount(filters) === 0} onClick={onClear}>
          {t('shopall.filters.clearAll')}
        </button>
      ) : null}
    </div>
  )
}
