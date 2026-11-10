import type { CatalogueItem } from './interactive/shopCatalogue'

/** The Shop All page's orders. "Featured" is the store's own order; "Newest First" is the Shop API's newest order. */
export type SortChoice = 'featured' | 'price-low' | 'price-high' | 'name-az' | 'name-za' | 'newest'

export const sortChoices: readonly SortChoice[] = ['featured', 'price-low', 'price-high', 'name-az', 'name-za', 'newest']

export type StockChoice = 'in' | 'out'

export const stockChoices: readonly StockChoice[] = ['in', 'out']

/** What the shopper has narrowed the catalogue to; `price` is null while it spans every price. */
export type ShopFilters = {
  search: string
  collections: string[]
  price: { min: number; max: number } | null
  stock: StockChoice[]
}

export const noFilters: ShopFilters = { search: '', collections: [], price: null, stock: [] }

/** Each word the shopper typed appears in the product's name, in any case and order. */
const matchesSearch = (item: CatalogueItem, search: string) => {
  const name = item.card.name.toLowerCase()
  return search
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => name.includes(word))
}

/** In any one of the chosen collections; a product in two chosen collections still counts once. */
const matchesCollections = (item: CatalogueItem, slugs: readonly string[]) => slugs.length === 0 || slugs.some((s) => item.collections.includes(s))

/** The price its card shows (its cheapest pack size's) is between the two prices, both included. */
const matchesPrice = (item: CatalogueItem, price: ShopFilters['price']) => price === null || (item.price !== null && item.price >= price.min && item.price <= price.max)

const stockOf = (item: CatalogueItem): StockChoice => (item.card.stock.inStock ? 'in' : 'out')

const matchesStock = (item: CatalogueItem, stock: readonly StockChoice[]) => stock.length === 0 || stock.includes(stockOf(item))

/**
 * The products every filter allows: words, collections, price and availability together. `except` leaves one filter out,
 * so that filter's own counts show what choosing each of its values would give with the others as they are.
 */
export const applyFilters = (items: readonly CatalogueItem[], filters: ShopFilters, except?: 'collections' | 'stock') =>
  items.filter(
    (item) =>
      matchesSearch(item, filters.search) &&
      (except === 'collections' || matchesCollections(item, filters.collections)) &&
      matchesPrice(item, filters.price) &&
      (except === 'stock' || matchesStock(item, filters.stock)),
  )

/** How many products each collection would show, given the other filters. */
export const collectionCounts = (items: readonly CatalogueItem[], filters: ShopFilters) => {
  const pool = applyFilters(items, filters, 'collections')
  return (slug: string) => pool.filter((item) => item.collections.includes(slug)).length
}

/** How many products in stock and out of stock, given the other filters. */
export const stockCounts = (items: readonly CatalogueItem[], filters: ShopFilters) => {
  const pool = applyFilters(items, filters, 'stock')
  return (choice: StockChoice) => pool.filter((item) => stockOf(item) === choice).length
}

/** By the order chosen; a product with no price goes last in a price order, and ties keep the store's order. */
export const sortItems = (items: readonly CatalogueItem[], sort: SortChoice, locale: string) => {
  const byName = (a: CatalogueItem, b: CatalogueItem) => a.card.name.localeCompare(b.card.name, locale)
  const priced = (value: number | null, high: boolean) => value ?? (high ? -Infinity : Infinity)
  const order: Record<SortChoice, (a: CatalogueItem, b: CatalogueItem) => number> = {
    featured: (a, b) => a.featured - b.featured,
    'price-low': (a, b) => priced(a.price, false) - priced(b.price, false) || a.featured - b.featured,
    'price-high': (a, b) => priced(b.price, true) - priced(a.price, true) || a.featured - b.featured,
    'name-az': (a, b) => byName(a, b) || a.featured - b.featured,
    'name-za': (a, b) => byName(b, a) || a.featured - b.featured,
    newest: (a, b) => a.newest - b.newest || a.featured - b.featured,
  }
  return [...items].sort(order[sort])
}

/** How many filters are on, each chosen collection and availability counting as one. */
export const activeCount = (filters: ShopFilters) =>
  [...(filters.search.trim() ? [filters.search] : []), ...filters.collections, ...(filters.price ? [filters.price] : []), ...filters.stock].length

/** A whole amount in the shopper's locale with the store's currency, such as ₹85. */
export const formatAmount = (value: number, currency: string, locale: string) => value.toLocaleString(locale, { style: 'currency', currency, maximumFractionDigits: 0, minimumFractionDigits: 0 })
