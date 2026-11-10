import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { ReasonIcon, RecipePicture, SectionHead, Sprig, TemperatureIcon, type TeaPhotos } from './RecipeArt'
import { reasons, servings } from './recipes'
import styles from '../../styles/recipes.module.css'

/** Section 5: four ways a restaurant can serve the teas, each card leading to the recipe that makes it. */
export const RestaurantMenuSection = ({ photos }: { photos: TeaPhotos }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="recipes-menu">
      <div className={styles.wide}>
        <SectionHead eyebrow={t('recipes.menu.eyebrow')} title={t('recipes.menu.title')} id="recipes-menu" center>
          <p className={styles.headLead}>{t('recipes.menu.lead')}</p>
        </SectionHead>
        <ul className={styles.menu}>
          {servings.map((s) => {
            const cold = s.temperature === 'cold'
            return (
              <li key={s.key} className={`${styles.serving} ${styles.reveal}`}>
                <div className={styles.servingPicture}>
                  <RecipePicture slot={s.slot} fallback={photos[s.tea]} className={styles.cover} />
                  <span className={cold ? `${styles.badge} ${styles.badgeCold}` : styles.badge}>
                    <TemperatureIcon cold={cold} className={styles.badgeIcon} />
                    {cold ? t('recipes.card.cold') : t('recipes.card.hot')}
                  </span>
                </div>
                <div className={styles.servingBody}>
                  <h3 className={styles.servingTitle}>{t(`recipes.menu.items.${s.key}.title` as const)}</h3>
                  <p className={styles.servingText}>{t(`recipes.menu.items.${s.key}.body` as const)}</p>
                  <Link href={`#${s.anchor}`} className={styles.servingLink}>
                    {t('recipes.menu.recipe')}
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Section 6: the five brand points restaurants can tell their customers, as the product labels state them. */
export const RecipeBenefits = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.sectionTint} aria-labelledby="recipes-why">
      <div className={styles.wide}>
        <SectionHead eyebrow={t('recipes.why.eyebrow')} title={t('recipes.why.title')} id="recipes-why" center />
        <ul className={styles.reasons}>
          {reasons.map((key) => (
            <li key={key} className={`${styles.reason} ${styles.reveal}`}>
              <span className={styles.reasonIconWrap}>
                <ReasonIcon kind={key} className={styles.reasonIcon} />
              </span>
              <h3 className={styles.reasonTitle}>{t(`recipes.why.items.${key}.title` as const)}</h3>
              <p className={styles.reasonText}>{t(`recipes.why.items.${key}.body` as const)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Section 7: the restaurant enquiry band, to the contact page and the products, with the store's own contact details. */
export const RestaurantEnquiryCTA = () => {
  const { store, t } = useStorefront()
  return (
    <section className={styles.cta} aria-labelledby="recipes-cta">
      <Sprig className={styles.ctaSprig} />
      <div className={`${styles.ctaInner} ${styles.reveal}`}>
        <SectionHead eyebrow={t('recipes.cta.eyebrow')} title={t('recipes.cta.title')} id="recipes-cta" center light>
          <p className={styles.ctaLead}>{t('recipes.cta.lead')}</p>
        </SectionHead>
        <div className={styles.ctaActions}>
          <Link href="/contact/" className={styles.buttonGold}>
            {t('recipes.cta.contact')}
          </Link>
          <Link href="/collections/all/" className={styles.buttonGhost}>
            {t('recipes.cta.products')}
          </Link>
        </div>
        {store.contactPhone || store.contactEmail ? (
          <p className={styles.ctaContact}>
            {store.contactPhone ? <span>{t('common.footer.phone', { phone: store.contactPhone })}</span> : null}
            {store.contactEmail ? <span>{t('common.footer.email', { email: store.contactEmail })}</span> : null}
          </p>
        ) : null}
      </div>
    </section>
  )
}
