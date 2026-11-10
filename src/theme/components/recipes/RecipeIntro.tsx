import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { RecipePicture, SectionHead, Sprig, TemperatureIcon, type TeaPhotos } from './RecipeArt'
import styles from '../../styles/recipes.module.css'

/** Section 1: the page's one h1, the ways to the hot and the cold recipes, and a hot cup beside an iced glass. */
export const RecipeHero = ({ photos }: { photos: TeaPhotos }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.hero} aria-labelledby="recipes-title">
      <Sprig className={styles.heroSprig} />
      <Sprig className={styles.heroSprigRight} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={`${styles.heroEyebrow} ${styles.enter}`}>{t('recipes.hero.eyebrow')}</p>
          <h1 id="recipes-title" className={`${styles.heroTitle} ${styles.enter} ${styles.delay1}`}>
            {t('recipes.hero.title')}
          </h1>
          <p className={`${styles.heroLead} ${styles.enter} ${styles.delay2}`}>{t('recipes.hero.lead')}</p>
          <div className={`${styles.heroActions} ${styles.enter} ${styles.delay3}`}>
            <Link href="#hot-recipes" className={styles.buttonGold}>
              {t('recipes.hero.hot')}
            </Link>
            <Link href="#cold-recipes" className={styles.buttonGhost}>
              {t('recipes.hero.cold')}
            </Link>
          </div>
        </div>
        <div className={`${styles.heroVisual} ${styles.enterSoft}`}>
          <figure className={styles.heroHot}>
            <RecipePicture slot="hero" fallback={photos.herbal} className={styles.cover} />
            <figcaption className={styles.heroTag}>
              <TemperatureIcon cold={false} className={styles.badgeIcon} />
              {t('recipes.hero.hotTag')}
            </figcaption>
          </figure>
          <figure className={styles.heroCold}>
            <RecipePicture slot="heroCold" fallback={photos.ginger} className={styles.cover} />
            <figcaption className={`${styles.heroTag} ${styles.heroTagCold}`}>
              <TemperatureIcon cold className={styles.badgeIcon} />
              {t('recipes.hero.coldTag')}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/** Section 2: the client's own invitation to Govinda Restaurants and snack corners, beside a served cup. */
export const RecipeIntroduction = ({ photos }: { photos: TeaPhotos }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="recipes-intro">
      <div className={`${styles.split} ${styles.reveal}`}>
        <div className={styles.framed}>
          <RecipePicture slot="intro" fallback={photos.herbal} className={styles.cover} />
        </div>
        <div className={styles.copy}>
          <SectionHead eyebrow={t('recipes.intro.eyebrow')} title={t('recipes.intro.title')} id="recipes-intro" />
          <blockquote className={styles.quote}>
            <p>{t('recipes.intro.quote')}</p>
          </blockquote>
          <p className={styles.lead}>{t('recipes.intro.invite')}</p>
          <p className={styles.body}>{t('recipes.intro.methods')}</p>
          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>{t('recipes.intro.hotLabel')}</dt>
              <dd>{t('recipes.intro.hotCount')}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{t('recipes.intro.coldLabel')}</dt>
              <dd>{t('recipes.intro.coldCount')}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{t('recipes.intro.teaLabel')}</dt>
              <dd>{t('recipes.intro.teaCount')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
