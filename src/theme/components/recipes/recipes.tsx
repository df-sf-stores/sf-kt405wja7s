/**
 * The four preparation methods from the client's recipe document, in the order the page shows them. Each one's words,
 * quantities and timings are in content/en/recipes.json under items.{key}: its ingredients and its steps one per line,
 * and a tip or a note where the document gives one (empty where it doesn't).
 */
export type RecipeKey = 'hotMilk' | 'hotWater' | 'coldShake' | 'iced'

export type Recipe = {
  key: RecipeKey
  temperature: 'hot' | 'cold'
  /** The section anchor, so the hero, the menu cards and shared links can jump to it. */
  anchor: string
  /** The ingredient line (from 0) the document gives as a choice instead of the one before it, shown after an "or". */
  alternative?: number
  /** The recipe whose words hold the document's closing advice on tea strength, shown apart from the steps. */
  tip?: 'coldShake' | 'iced'
  /** The recipe whose words hold a short serving note under the method. */
  note?: 'hotWater'
}

export const hotRecipes: readonly Recipe[] = [
  { key: 'hotMilk', temperature: 'hot', anchor: 'recipe-hot-milk', alternative: 1 },
  { key: 'hotWater', temperature: 'hot', anchor: 'recipe-hot-water', note: 'hotWater' },
]

export const coldRecipes: readonly Recipe[] = [
  { key: 'coldShake', temperature: 'cold', anchor: 'recipe-cold-shake', tip: 'coldShake' },
  { key: 'iced', temperature: 'cold', anchor: 'recipe-iced', tip: 'iced' },
]

/** A words value's lines, blank ones dropped. */
export const linesOf = (words: string) =>
  words
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

/** The menu section's four ways to serve, each pointing at the recipe that makes it. */
export type ServingKey = 'hotHerbal' | 'hotGinger' | 'coldShake' | 'iced'

export const servings: readonly { key: ServingKey; temperature: 'hot' | 'cold'; anchor: string; slot: 'menuHerbal' | 'menuGinger' | 'menuShake' | 'menuIced'; tea: 'herbal' | 'ginger' }[] = [
  { key: 'hotHerbal', temperature: 'hot', anchor: 'recipe-hot-milk', slot: 'menuHerbal', tea: 'herbal' },
  { key: 'hotGinger', temperature: 'hot', anchor: 'recipe-hot-milk', slot: 'menuGinger', tea: 'ginger' },
  { key: 'coldShake', temperature: 'cold', anchor: 'recipe-cold-shake', slot: 'menuShake', tea: 'herbal' },
  { key: 'iced', temperature: 'cold', anchor: 'recipe-iced', slot: 'menuIced', tea: 'herbal' },
]

/** The five brand points, worded as the About page and the product labels already state them. */
export type ReasonKey = 'caffeine' | 'tannin' | 'leaves' | 'varieties' | 'serving'

export const reasons: readonly ReasonKey[] = ['caffeine', 'tannin', 'leaves', 'varieties', 'serving']
