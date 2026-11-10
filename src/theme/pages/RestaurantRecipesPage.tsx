import { useCollections, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import type { TeaPhotos } from '../components/recipes/RecipeArt'
import { RecipeHero, RecipeIntroduction } from '../components/recipes/RecipeIntro'
import { ColdTeaRecipes, HotTeaRecipes } from '../components/recipes/RecipeLists'
import { RecipeBenefits, RestaurantEnquiryCTA, RestaurantMenuSection } from '../components/recipes/RestaurantSections'
import styles from '../styles/recipes.module.css'

/**
 * /herbal-tea-recipes/restaurants/: the client's four hot and cold preparation methods for Govind Madhav Herbal Tea and Ginger Tea,
 * for restaurants, cafés, snack corners and Govinda Restaurants. Pictures are the client's Storefront › Assets files once
 * their ids are in content/en/recipes.json; until then the store's Herbal Tea and Ginger Tea collection photographs stand in.
 */
export const RestaurantRecipesPage = () => {
  const { t } = useStorefront()
  useHead({ title: t('recipes.seo.title'), description: t('recipes.seo.description') })
  const { collections } = useCollections({ first: 20 })
  const photoOf = (href: string) => collections.find((c) => c.href === href)?.image ?? null
  const photos: TeaPhotos = { herbal: photoOf('/collections/herbal-tea/'), ginger: photoOf('/collections/ginger-tea/') }
  return (
    <Layout>
      <div className={styles.page}>
        <RecipeHero photos={photos} />
        <RecipeIntroduction photos={photos} />
        <HotTeaRecipes photos={photos} />
        <ColdTeaRecipes photos={photos} />
        <RestaurantMenuSection photos={photos} />
        <RecipeBenefits />
        <RestaurantEnquiryCTA />
      </div>
    </Layout>
  )
}
