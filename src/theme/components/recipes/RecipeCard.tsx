import { useStorefront, type Photo } from '@dripfunnel/storefront-core/theme'
import { RecipePicture, TemperatureIcon } from './RecipeArt'
import { linesOf, type Recipe } from './recipes'
import styles from '../../styles/recipes.module.css'

/**
 * One preparation method: its picture, hot or cold badge, title, ingredients with their exact quantities, numbered steps
 * and any tip or note from the client's document. `feature` lays it out in two columns with a large picture; `card`
 * stacks it for a grid of two.
 */
export const RecipeCard = ({ recipe, layout, fallback, flip }: { recipe: Recipe; layout: 'feature' | 'card'; fallback: Photo | null; flip?: boolean }) => {
  const { t } = useStorefront()
  const { key, temperature, anchor, alternative } = recipe
  const cold = temperature === 'cold'
  const ingredients = linesOf(t(`recipes.items.${key}.ingredients` as const))
  const steps = linesOf(t(`recipes.items.${key}.steps` as const))
  const tip = recipe.tip ? t(`recipes.items.${recipe.tip}.tip` as const) : null
  const note = recipe.note ? t(`recipes.items.${recipe.note}.note` as const) : null
  const titleId = `${anchor}-title`
  const frame = layout === 'feature' ? (flip ? `${styles.feature} ${styles.featureFlip}` : styles.feature) : styles.card
  return (
    <article id={anchor} className={`${frame} ${styles.reveal}`} aria-labelledby={titleId}>
      <div className={layout === 'feature' ? styles.featurePicture : styles.cardPicture}>
        <RecipePicture slot={key} fallback={fallback} className={styles.cover} />
        <span className={cold ? `${styles.badge} ${styles.badgeCold}` : styles.badge}>
          <TemperatureIcon cold={cold} className={styles.badgeIcon} />
          {cold ? t('recipes.card.cold') : t('recipes.card.hot')}
        </span>
      </div>
      <div className={styles.recipeBody}>
        <p className={styles.recipeNumber}>{t(`recipes.items.${key}.number` as const)}</p>
        <h3 id={titleId} className={styles.recipeTitle}>
          {t(`recipes.items.${key}.title` as const)}
        </h3>
        <div className={styles.recipeColumns}>
          <div className={styles.ingredients}>
            <h4 className={styles.recipeLabel}>{t('recipes.card.ingredients')}</h4>
            <ul className={styles.ingredientList}>
              {ingredients.map((line, i) => (
                <li key={line} className={i === alternative ? `${styles.ingredient} ${styles.ingredientAlt}` : styles.ingredient}>
                  {i === alternative ? <span className={styles.or}>{t('recipes.card.or')}</span> : null}
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.method}>
            <h4 className={styles.recipeLabel}>{t('recipes.card.method')}</h4>
            <ol className={styles.steps}>
              {steps.map((line) => (
                <li key={line} className={styles.step}>
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </div>
        {tip ? (
          <aside className={styles.tip}>
            <p className={styles.tipLabel}>{t('recipes.card.tip')}</p>
            <p className={styles.tipText}>{tip}</p>
          </aside>
        ) : null}
        {note ? (
          <aside className={`${styles.tip} ${styles.note}`}>
            <p className={styles.tipLabel}>{t('recipes.card.note')}</p>
            <p className={styles.tipText}>{note}</p>
          </aside>
        ) : null}
      </div>
    </article>
  )
}
