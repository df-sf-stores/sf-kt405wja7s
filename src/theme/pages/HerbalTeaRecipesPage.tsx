import { useHead, useProductCards, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { productHrefOf, productSlugs, teas, type TeaKey } from '../components/herbalRecipes'
import { HerbalRecipesHero, RecipeCollection, RecipeIntroduction, RestaurantRecipesLink } from '../components/herbalrecipes/HerbalRecipesSections'
import { RecipeDetail } from '../components/interactive/RecipeDetail'
import styles from '../styles/herbalrecipes.module.css'

/**
 * /herbal-tea-recipes/: how to prepare each of the six teas four ways, from the client's six recipe documents. Pack
 * photographs and shop links come from the store's own products; a product that isn't on sale shows its recipe only.
 * The larger-batch restaurant recipes are on /herbal-tea-recipes/restaurants/.
 */
export const HerbalTeaRecipesPage = () => {
  const { t } = useStorefront()
  useHead({ title: t('herbalrecipes.seo.title'), description: t('herbalrecipes.seo.description') })
  const { cards: found } = useProductCards(productSlugs)
  const cards = new Map(teas.flatMap((tea): [TeaKey, ProductCard][] => {
    const card = found.find((c) => c.href === productHrefOf(tea))
    return card ? [[tea, card]] : []
  }))
  return (
    <Layout>
      <div className={styles.page}>
        <HerbalRecipesHero cards={cards} />
        <RecipeIntroduction />
        <RecipeCollection cards={cards} />
        <div className={styles.details} aria-label={t('herbalrecipes.collection.title')}>
          {teas.map((tea, i) => (
            <RecipeDetail key={tea} tea={tea} card={cards.get(tea)} flip={i % 2 === 1} />
          ))}
        </div>
        <RestaurantRecipesLink />
      </div>
    </Layout>
  )
}
