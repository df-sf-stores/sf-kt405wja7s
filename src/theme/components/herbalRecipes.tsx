/**
 * The six product recipes from the client's documents (RECIPE … 23-07-25 PDF F.pdf), one per tea, each in four ways.
 * The words (steps, what you need, notes) are in content/en/herbalrecipes.json under items.{tea}.methods.{method},
 * one line each, as the documents state them; this file only says which teas and methods there are and which product
 * page each recipe belongs to.
 */
export type TeaKey = 'weightLoss' | 'tulsi' | 'herbal' | 'ginger' | 'diabetic' | 'cough'

export const teas: readonly TeaKey[] = ['weightLoss', 'tulsi', 'herbal', 'ginger', 'diabetic', 'cough']

export type MethodKey = 'hotMilk' | 'hotWater' | 'icedShake' | 'icedWater'

export const methods: readonly MethodKey[] = ['hotMilk', 'hotWater', 'icedShake', 'icedWater']

export const isIced = (method: MethodKey) => method === 'icedShake' || method === 'icedWater'

/** Each recipe's product, by the product's own address on this store, so a product page shows only its own recipe. */
const productHrefs = new Map<TeaKey, string>([
  ['weightLoss', '/products/govind-madhav-weight-loss-tea/'],
  ['tulsi', '/products/govind-madhav-tulsi-tea/'],
  ['herbal', '/products/govind-madhav-herbal-tea/'],
  ['ginger', '/products/govind-madhav-ginger-tea/'],
  ['diabetic', '/products/govind-madhav-diabetic-tea/'],
  ['cough', '/products/govind-madhav-cough-tea/'],
])

export const productHrefOf = (tea: TeaKey) => productHrefs.get(tea) ?? null

/** The product slugs, for core's product cards (a hidden product is left out of the answer). */
export const productSlugs = teas.map((tea) => (productHrefs.get(tea) ?? '').slice('/products/'.length, -1)).filter(Boolean)

/** The recipe for the product at `href`, or null for a product with none. */
export const recipeForProduct = (href: string) => teas.find((tea) => productHrefs.get(tea) === href) ?? null

/** The anchor of a tea's recipe section on /herbal-tea-recipes/. */
export const recipeAnchor = (tea: TeaKey) => `recipe-${tea}`

/** A words value's lines, blank ones dropped. */
export const linesOf = (words: string) =>
  words
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
