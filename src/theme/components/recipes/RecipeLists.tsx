import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { SectionHead, type TeaPhotos } from './RecipeArt'
import { RecipeCard } from './RecipeCard'
import { coldRecipes, hotRecipes } from './recipes'
import styles from '../../styles/recipes.module.css'

/** Section 3: the two hot methods, each a large two-column recipe, the second one mirrored. */
export const HotTeaRecipes = ({ photos }: { photos: TeaPhotos }) => {
  const { t } = useStorefront()
  return (
    <section id="hot-recipes" className={styles.sectionTint} aria-labelledby="recipes-hot">
      <div className={styles.wide}>
        <SectionHead eyebrow={t('recipes.hot.eyebrow')} title={t('recipes.hot.title')} id="recipes-hot" center>
          <p className={styles.headLead}>{t('recipes.hot.lead')}</p>
        </SectionHead>
        <div className={styles.features}>
          {hotRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.key} recipe={recipe} layout="feature" flip={i % 2 === 1} fallback={i % 2 === 1 ? photos.ginger : photos.herbal} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Section 4: the two cold methods, as a pair of recipe cards. */
export const ColdTeaRecipes = ({ photos }: { photos: TeaPhotos }) => {
  const { t } = useStorefront()
  return (
    <section id="cold-recipes" className={styles.sectionCool} aria-labelledby="recipes-cold">
      <div className={styles.wide}>
        <SectionHead eyebrow={t('recipes.cold.eyebrow')} title={t('recipes.cold.title')} id="recipes-cold" center>
          <p className={styles.headLead}>{t('recipes.cold.lead')}</p>
        </SectionHead>
        <div className={styles.cards}>
          {coldRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.key} recipe={recipe} layout="card" fallback={i % 2 === 1 ? photos.ginger : photos.herbal} />
          ))}
        </div>
      </div>
    </section>
  )
}
