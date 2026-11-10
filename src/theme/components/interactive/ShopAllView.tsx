'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useHead, useMediaQuery, useStorefront, type Listing } from '@dripfunnel/storefront-core/theme'
import { Notice } from '../Notice'
import { CollectionHeader } from '../shopall/CollectionHeader'
import { activeCount, applyFilters, noFilters, sortItems, type ShopFilters, type SortChoice } from '../shopFilters'
import { MobileFilterDrawer } from './MobileFilterDrawer'
import { Retry } from './Retry'
import { useShopCatalogue } from './shopCatalogue'
import { ProductFilterPanel } from './ShopFilterPanel'
import { ShopProductCard } from './ShopProductCard'
import { ActiveFilterChips, ProductToolbar } from './ShopToolbar'
import styles from '../../styles/shopall.module.css'

/** Products shown at first and added by each Load More; the whole catalogue is loaded, so this only paces the grid. */
const pageStep = 12

/** No product matches the filters: clear them, or go on shopping from the home page. */
const EmptyProductsState = ({ onClear }: { onClear: () => void }) => {
  const { t } = useStorefront()
  return (
    <div className={styles.empty}>
      <svg className={styles.emptyArt} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14 30h30v6a15 15 0 01-30 0z" />
        <path d="M44 32h3a5 5 0 010 10h-4" />
        <path d="M10 52h40" />
        <path d="M26 24c-3-4 3-6 0-11M34 24c-3-4 3-6 0-11" />
        <path d="M48 12l8 8M56 12l-8 8" />
      </svg>
      <h2 className={styles.emptyTitle}>{t('shopall.empty.title')}</h2>
      <p className={styles.emptyLead}>{t('shopall.empty.lead')}</p>
      <div className={styles.emptyActions}>
        <button type="button" className={styles.primaryButton} onClick={onClear}>
          {t('shopall.empty.clear')}
        </button>
        <Link href="/" className={styles.secondaryButton}>
          {t('shopall.empty.continue')}
        </Link>
      </div>
    </div>
  )
}

/** The grid's shape while the products load, so nothing moves when they arrive. */
const GridSkeleton = () => {
  const { t } = useStorefront()
  return (
    <ul className={styles.grid} aria-busy="true" aria-label={t('shop.listing.loading')}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <li key={i} className={styles.skeleton}>
          <span className={styles.skeletonPicture} />
          <span className={styles.skeletonLine} />
          <span className={styles.skeletonLineShort} />
        </li>
      ))}
    </ul>
  )
}

/**
 * /collections/all/: every published product, with search, categories, price and availability filters that work together,
 * the sort, chips for each filter that's on, and on narrow screens a Filter & Sort drawer. `listing` is the page's own.
 */
export const ShopAllView = ({ listing }: { listing: Listing }) => {
  const { t, locale } = useStorefront()
  useHead({ title: t('shopall.seo.title'), description: t('shopall.seo.description') })
  const catalogue = useShopCatalogue(listing)
  const [filters, setFilters] = useState<ShopFilters>(noFilters)
  const [sort, setSort] = useState<SortChoice>('featured')
  const [shown, setShown] = useState(pageStep)
  const wide = useMediaQuery('(min-width: 960px)')
  const [drawer, setDrawer] = useState(false)
  const opener = useRef<HTMLButtonElement>(null)

  const change = (next: ShopFilters) => {
    setFilters(next)
    setShown(pageStep)
  }
  const clear = () => change(noFilters)
  const results = useMemo(() => sortItems(applyFilters(catalogue.items, filters), sort, locale), [catalogue.items, filters, sort, locale])
  const names = useMemo(() => new Map(catalogue.collections.map((c) => [c.slug, c.name])), [catalogue.collections])

  // The drawer belongs to narrow screens; widening the window closes it, and the sidebar takes over.
  useEffect(() => {
    if (wide) setDrawer(false)
  }, [wide])
  const closeDrawer = () => {
    setDrawer(false)
    setTimeout(() => opener.current?.focus(), 0)
  }

  const ready = catalogue.status === 'ready'
  return (
    <div className={styles.page}>
      {catalogue.members}
      <CollectionHeader count={ready ? results.length : null} />
      <div className={styles.layout}>
        {wide ? (
          <aside className={styles.sidebar} aria-label={t('shopall.filters.label')}>
            <h2 className={styles.sidebarTitle}>{t('shopall.filters.title')}</h2>
            <ProductFilterPanel catalogue={catalogue} filters={filters} onChange={change} onClear={clear} />
          </aside>
        ) : null}
        <section className={styles.results} aria-label={t('shop.listing.heading')}>
          <ProductToolbar ref={opener} count={ready ? results.length : 0} active={activeCount(filters)} sort={sort} onSort={setSort} onOpenFilters={wide ? null : () => setDrawer(true)} />
          <ActiveFilterChips catalogue={catalogue} filters={filters} onChange={change} />
          {catalogue.status === 'loading' ? <GridSkeleton /> : null}
          {catalogue.status === 'error' ? (
            <Notice title={t('shop.listing.failed')} lead={t('shop.listing.failedLead')}>
              <Retry label={t('shop.listing.retry')} onRetry={catalogue.retry} />
            </Notice>
          ) : null}
          {ready && catalogue.items.length === 0 ? <Notice title={t('shopall.empty.noneTitle')} lead={t('shopall.empty.noneLead')} /> : null}
          {ready && catalogue.items.length > 0 && results.length === 0 ? <EmptyProductsState onClear={clear} /> : null}
          {ready && results.length > 0 ? (
            <ul className={styles.grid}>
              {results.slice(0, shown).map((item) => (
                <li key={item.card.id} className={styles.cell}>
                  <ShopProductCard item={item} collection={item.collections[0] ? (names.get(item.collections[0]) ?? null) : null} />
                </li>
              ))}
            </ul>
          ) : null}
          {ready && results.length > shown ? (
            <div className={styles.more}>
              <p className={styles.muted}>{t('shopall.more.showingOf', { shown, total: results.length })}</p>
              <button type="button" className={styles.secondaryButton} onClick={() => setShown(shown + pageStep)}>
                {t('shopall.more.button')}
              </button>
            </div>
          ) : null}
        </section>
      </div>
      {drawer && !wide ? (
        <MobileFilterDrawer
          catalogue={catalogue}
          filters={filters}
          onChange={change}
          onClear={clear}
          sort={sort}
          onSort={setSort}
          count={applyFilters(catalogue.items, filters).length}
          onClose={closeDrawer}
        />
      ) : null}
    </div>
  )
}
