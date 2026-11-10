'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useCollections, useListing, useProducts, type CollectionCard, type Listing, type ProductCard } from '@dripfunnel/storefront-core/theme'

/** A product of the Shop All page with what its filters need: the collections it's in and its price as a number. */
export type CatalogueItem = {
  card: ProductCard
  /** The slugs of the store's collections this product is in, as the Shop API lists them. */
  collections: string[]
  /** The price the card shows (its cheapest version's, "From" when versions differ), in major units. */
  price: number | null
  /** Its place in the store's own order and in the Shop API's newest-first order, for sorting. */
  featured: number
  newest: number
}

export type CatalogueCollection = { slug: string; name: string }

export type Catalogue = {
  /** The products themselves. */
  status: 'loading' | 'ready' | 'error'
  /** Which collection each product is in, which arrives just after the products. */
  detailsReady: boolean
  retry: () => void
  items: CatalogueItem[]
  collections: CatalogueCollection[]
  /** The lowest and highest card price across the catalogue, whole units, or null before any price is known. */
  bounds: { min: number; max: number } | null
  currency: string | null
}

/** Currencies with no minor unit; every other currency the Shop API sends has two digits after the point. */
const wholeCurrencies = new Set(['JPY', 'KRW', 'VND', 'CLP', 'ISK', 'UGX', 'XAF', 'XOF', 'PYG'])

/** A Shop API amount, minor units as a string, in major units. */
const majorUnits = (amount: string, currency: string) => {
  const minor = Number(amount)
  if (!Number.isFinite(minor)) return null
  return wholeCurrencies.has(currency) ? minor : minor / 100
}

const collectionSlug = (c: CollectionCard) => c.href.slice('/collections/'.length).split('/')[0] ?? ''

/** A listing with every page loaded, one "Load more" after another, so filters judge the whole catalogue. */
const useWholeListing = (listing: Listing) => {
  const { status, hasMore, loadingMore, moreFailed, fetchMore } = listing
  useEffect(() => {
    if (status === 'ready' && hasMore && !loadingMore && !moreFailed) fetchMore()
  }, [status, hasMore, loadingMore, moreFailed, fetchMore])
  return status === 'ready' && hasMore && !moreFailed ? 'loading' : status
}

/** Reads one collection's products, every page, and hands their ids up; it renders nothing. */
const CollectionMembers = ({ slug, onIds }: { slug: string; onIds: (slug: string, ids: readonly string[] | null) => void }) => {
  const listing = useListing({ collection: slug })
  const status = useWholeListing(listing)
  const ids = status === 'ready' ? listing.items.map((p) => p.id).join(' ') : null
  useEffect(() => {
    onIds(slug, ids === null ? null : ids.split(' ').filter(Boolean))
  }, [slug, ids, onIds])
  return null
}

/**
 * The Shop All catalogue: every published product the Shop API lists, which of the store's collections each is in, and
 * its price. Hidden products never reach it, since the Shop API doesn't list them. `listing` is the page's own; `members`
 * must be rendered, as it reads each collection.
 */
export const useShopCatalogue = (listing: Listing): Catalogue & { members: ReactNode } => {
  const listingStatus = useWholeListing(listing)
  const shelf = useCollections({ first: 50 })
  const collections = useMemo(() => shelf.collections.map((c) => ({ slug: collectionSlug(c), name: c.name })).filter((c) => c.slug !== ''), [shelf.collections])
  const [members, setMembers] = useState<ReadonlyMap<string, readonly string[] | null>>(new Map())
  const onIds = useMemo(
    () => (slug: string, ids: readonly string[] | null) =>
      setMembers((m) => {
        if (m.get(slug) === ids) return m
        const next = new Map(m)
        next.set(slug, ids)
        return next
      }),
    [],
  )
  const newest = useProducts({ sort: 'newest', first: 24 })
  const newestRank = useMemo(() => new Map(newest.products.map((p, i) => [p.id, i])), [newest.products])

  const items = useMemo<CatalogueItem[]>(
    () =>
      listing.items.map((card, i) => ({
        card,
        collections: collections.filter((c) => members.get(c.slug)?.includes(card.id)).map((c) => c.slug),
        price: card.price ? majorUnits(card.price.amount, card.price.currency) : null,
        featured: i,
        newest: newestRank.get(card.id) ?? newest.products.length + i,
      })),
    [listing.items, collections, members, newestRank, newest.products.length],
  )

  const prices = items.flatMap((i) => (i.price === null ? [] : [i.price]))
  const bounds = prices.length ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) } : null
  const status = listingStatus === 'error' ? 'error' : listingStatus === 'ready' ? 'ready' : 'loading'
  const detailsReady = status === 'ready' && shelf.status !== 'loading' && collections.every((c) => Boolean(members.get(c.slug)))

  return {
    status,
    detailsReady,
    retry: listing.retry,
    items,
    collections,
    bounds,
    currency: listing.items.find((p) => p.price)?.price?.currency ?? null,
    members: collections.map((c) => <CollectionMembers key={c.slug} slug={c.slug} onIds={onIds} />),
  }
}
