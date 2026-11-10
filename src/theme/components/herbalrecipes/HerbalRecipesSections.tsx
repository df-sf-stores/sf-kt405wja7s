import type { ReactNode } from 'react'
import { Image, Link, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { methods, productHrefOf, recipeAnchor, recipeForProduct, teas, type MethodKey, type TeaKey } from '../herbalRecipes'
import styles from '../../styles/herbalrecipes.module.css'

/** The store's product card for each tea that is on sale, by the tea; a hidden product has none. */
export type TeaCards = ReadonlyMap<TeaKey, ProductCard>

/** A line icon for each way to prepare the tea: a steaming cup, a clear cup with lemon, a shake glass, an iced glass. */
export const MethodIcon = ({ method, className }: { method: MethodKey; className?: string }) => {
  const paths: Record<MethodKey, ReactNode> = {
    hotMilk: (
      <>
        <path d="M5 10h12v4.5a6 6 0 01-12 0z" />
        <path d="M17 11.5h1.5a2.5 2.5 0 010 5H17" />
        <path d="M8 3.5c-1 1.3 1 2 0 3.5M11 3.5c-1 1.3 1 2 0 3.5M14 3.5c-1 1.3 1 2 0 3.5" />
        <path d="M5 13h12" opacity="0.5" />
      </>
    ),
    hotWater: (
      <>
        <path d="M5 10h12v4.5a6 6 0 01-12 0z" />
        <path d="M17 11.5h1.5a2.5 2.5 0 010 5H17" />
        <path d="M9 3.5c-1 1.3 1 2 0 3.5M13 3.5c-1 1.3 1 2 0 3.5" />
        <circle cx="19.5" cy="5.5" r="2.5" />
      </>
    ),
    icedShake: (
      <>
        <path d="M6 7h12l-1.5 14h-9z" />
        <path d="M5 7h14" />
        <path d="M14 7l2-5h2" />
        <path d="M9.5 12.5h5M9 16h6" opacity="0.6" />
      </>
    ),
    icedWater: (
      <>
        <path d="M6 4h12l-1.5 17h-9z" />
        <path d="M9 9l3-1 1 3-3 1zM12 14l3-.8.8 3-3 .8z" />
        <path d="M8.5 7h7" opacity="0.5" />
      </>
    ),
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[method]}
    </svg>
  )
}

/** A fine-line sprig of leaves, the page's botanical mark. */
const Sprig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M60 158C58 110 62 60 88 6" />
    <path d="M61 128c-18-4-30-16-34-34 18 2 31 14 34 34zM62 100c16-6 26-19 28-36-16 4-27 17-28 36zM64 72c-14-6-22-18-22-33 14 5 21 17 22 33zM70 46c12-6 19-16 20-29-12 4-19 14-20 29z" />
  </svg>
)

/** A tea's pack photograph from the store, whole on ivory, or a fine-line cup while the product isn't on sale. */
/** How wide a tea picture shows in each place, for core's image sizes. */
const pictureSizes = {
  hero: '(min-width: 960px) 280px, 40vw',
  card: '(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw',
  detail: '(min-width: 1024px) 300px, 60vw',
} as const

export const TeaPicture = ({ tea, card, place, className }: { tea: TeaKey; card: ProductCard | undefined; place: keyof typeof pictureSizes; className?: string }) => {
  const { t } = useStorefront()
  const sizes = pictureSizes[place]
  if (card?.photo) return <Image image={card.photo} alt={t(`herbalrecipes.items.${tea}.alt` as const)} ratio={1} sizes={sizes} className={className} />
  return (
    <span className={styles.noPicture}>
      <MethodIcon method="hotMilk" className={styles.noPictureIcon} />
    </span>
  )
}

/** Section 1: the page's one h1 on forest green, the ways on, and three of the store's own packs fanned out. */
export const HerbalRecipesHero = ({ cards }: { cards: TeaCards }) => {
  const { t } = useStorefront()
  const shown = teas.filter((tea) => cards.get(tea)?.photo).slice(0, 3)
  return (
    <section className={styles.hero} aria-labelledby="herbal-recipes-title">
      <Sprig className={styles.heroSprig} />
      <Sprig className={styles.heroSprigRight} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={`${styles.heroEyebrow} ${styles.enter}`}>{t('herbalrecipes.hero.eyebrow')}</p>
          <h1 id="herbal-recipes-title" className={`${styles.heroTitle} ${styles.enter} ${styles.delay1}`}>
            {t('herbalrecipes.hero.title')}
          </h1>
          <p className={`${styles.heroLead} ${styles.enter} ${styles.delay2}`}>{t('herbalrecipes.hero.lead')}</p>
          <div className={`${styles.heroActions} ${styles.enter} ${styles.delay3}`}>
            <Link href="#recipes" className={styles.buttonGold}>
              {t('herbalrecipes.hero.explore')}
            </Link>
            <Link href="/collections/all/" className={styles.buttonGhost}>
              {t('herbalrecipes.hero.shop')}
            </Link>
          </div>
        </div>
        {shown.length ? (
          <div className={`${styles.heroPacks} ${styles.enterSoft}`} aria-hidden="true">
            {shown.map((tea, i) => (
              <span key={tea} className={`${styles.heroPack} ${i === 0 ? styles.heroPackMain : i === 1 ? styles.heroPackLeft : styles.heroPackRight}`}>
                <TeaPicture tea={tea} card={cards.get(tea)} place="hero" className={styles.contain} />
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/** Section 2: the four ways every tea can be prepared, each with its icon and a line from the recipes. */
export const RecipeIntroduction = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="herbal-recipes-intro">
      <div className={styles.head}>
        <p className={styles.eyebrow}>{t('herbalrecipes.intro.eyebrow')}</p>
        <h2 id="herbal-recipes-intro" className={styles.title}>
          {t('herbalrecipes.intro.title')}
        </h2>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.headLead}>{t('herbalrecipes.intro.lead')}</p>
      </div>
      <ul className={styles.methodGrid}>
        {methods.map((m) => (
          <li key={m} className={styles.method}>
            <span className={styles.methodIconWrap}>
              <MethodIcon method={m} className={styles.methodIcon} />
            </span>
            <h3 className={styles.methodTitle}>{t(`herbalrecipes.methods.${m}.label` as const)}</h3>
            <p className={styles.methodBody}>{t(`herbalrecipes.methods.${m}.body` as const)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** One tea's card: its pack, name, a line on how it's prepared, the four ways, its recipe and its product page. */
export const RecipeCard = ({ tea, card }: { tea: TeaKey; card: ProductCard | undefined }) => {
  const { t } = useStorefront()
  const titleId = `recipe-card-${tea}`
  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <Link href={`#${recipeAnchor(tea)}`} className={styles.cardPicture}>
        <TeaPicture tea={tea} card={card} place="card" className={styles.contain} />
      </Link>
      <div className={styles.cardBody}>
        <h3 id={titleId} className={styles.cardTitle}>
          {t(`herbalrecipes.items.${tea}.name` as const)}
        </h3>
        <p className={styles.cardIntro}>{t(`herbalrecipes.items.${tea}.intro` as const)}</p>
        <p className={styles.cardLabel}>{t('herbalrecipes.collection.methods')}</p>
        <ul className={styles.chips}>
          {methods.map((m) => (
            <li key={m} className={styles.chip}>
              <MethodIcon method={m} className={styles.chipIcon} />
              <span>{t(`herbalrecipes.methods.${m}.label` as const)}</span>
            </li>
          ))}
        </ul>
        <div className={styles.cardActions}>
          <Link href={`#${recipeAnchor(tea)}`} className={styles.primary}>
            {t('herbalrecipes.collection.view')}
          </Link>
          {card ? (
            <Link href={card.href} className={styles.secondary}>
              {t('herbalrecipes.collection.shop')}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}

/** Section 3: the six tea cards. */
export const RecipeCollection = ({ cards }: { cards: TeaCards }) => {
  const { t } = useStorefront()
  return (
    <section id="recipes" className={styles.sectionTint} aria-labelledby="herbal-recipes-collection">
      <div className={styles.head}>
        <p className={styles.eyebrow}>{t('herbalrecipes.collection.eyebrow')}</p>
        <h2 id="herbal-recipes-collection" className={styles.title}>
          {t('herbalrecipes.collection.title')}
        </h2>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.headLead}>{t('herbalrecipes.collection.lead')}</p>
      </div>
      <div className={styles.cards}>
        {teas.map((tea) => (
          <RecipeCard key={tea} tea={tea} card={cards.get(tea)} />
        ))}
      </div>
    </section>
  )
}

/** The closing band: larger-batch recipes for restaurants and snack corners have their own page. */
export const RestaurantRecipesLink = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.band} aria-labelledby="herbal-recipes-restaurants">
      <Sprig className={styles.bandSprig} />
      <div className={styles.bandInner}>
        <p className={styles.bandEyebrow}>{t('herbalrecipes.restaurants.eyebrow')}</p>
        <h2 id="herbal-recipes-restaurants" className={styles.bandTitle}>
          {t('herbalrecipes.restaurants.title')}
        </h2>
        <p className={styles.bandLead}>{t('herbalrecipes.restaurants.lead')}</p>
        <Link href="/herbal-tea-recipes/restaurants/" className={styles.buttonGold}>
          {t('herbalrecipes.restaurants.link')}
        </Link>
      </div>
    </section>
  )
}

/** On a product's page: how to prepare that tea, linking to its own recipe. Nothing shows for a product with no recipe. */
export const ProductRecipeLink = ({ href, className, titleClassName }: { href: string; className?: string; titleClassName?: string }) => {
  const { t } = useStorefront()
  const tea = recipeForProduct(href)
  if (!tea || productHrefOf(tea) !== href) return null
  return (
    <section className={className} aria-labelledby="product-recipe">
      <h2 id="product-recipe" className={titleClassName}>
        {t('herbalrecipes.product.title')}
      </h2>
      <p className={styles.productLead}>{t('herbalrecipes.product.lead')}</p>
      <Link href={`/herbal-tea-recipes/#${recipeAnchor(tea)}`} className={styles.productLink}>
        {t(`herbalrecipes.items.${tea}.viewLabel` as const)}
      </Link>
    </section>
  )
}
