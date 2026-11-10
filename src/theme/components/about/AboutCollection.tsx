import type { ReactNode } from 'react'
import { Image, Link, useProducts, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { SectionHead, Sprig } from './AboutArt'
import styles from '../../styles/aboutpage.module.css'

type Infusion = 'herbal' | 'cough' | 'diabetic' | 'ginger' | 'tulsi' | 'weightLoss' | 'masala'
/** The seven infusions in the order the page shows them. */
const shown: readonly Infusion[] = ['herbal', 'cough', 'diabetic', 'ginger', 'tulsi', 'weightLoss', 'masala']
/** The order they claim a store product in: the specific names first, so "herbal" doesn't take the Tulsi pack. */
const claiming: readonly Infusion[] = ['cough', 'diabetic', 'ginger', 'tulsi', 'weightLoss', 'masala', 'herbal']

/** Each infusion's product in the store's catalogue, by a word of its name (infusions.items.{key}.match), each product used once. */
const productsFor = (products: readonly ProductCard[], matchOf: (key: Infusion) => string) => {
  const used = new Set<string>()
  const found: Partial<Record<Infusion, ProductCard>> = {}
  for (const key of claiming) {
    const word = matchOf(key).trim().toLowerCase()
    const product = products.find((p) => !used.has(p.id) && word !== '' && p.name.toLowerCase().includes(word))
    if (product) {
      used.add(product.id)
      found[key] = product
    }
  }
  return found
}

/**
 * Section 9: the seven infusions with their herb counts from the client's documents. Each card shows its pack and links
 * to its product when the store sells it under that name; otherwise it links to a search for it.
 */
export const HerbalInfusionCollection = () => {
  const { t } = useStorefront()
  const { products } = useProducts({ first: 24 })
  const found = productsFor(products, (key) => t(`about.infusions.items.${key}.match` as const))
  return (
    <section id="our-infusions" className={styles.sectionTint} aria-labelledby="about-infusions">
      <div className={styles.narrow}>
        <SectionHead eyebrow={t('about.infusions.eyebrow')} title={t('about.infusions.title')} id="about-infusions" center>
          <p className={styles.headLead}>{t('about.infusions.lead')}</p>
        </SectionHead>
      </div>
      <ul className={styles.infusions}>
        {shown.map((key) => {
          const product = found[key]
          const name = t(`about.infusions.items.${key}.name` as const)
          const href = product ? product.href : `/search/?q=${t(`about.infusions.items.${key}.match` as const)}`
          return (
            <li key={key} className={`${styles.infusion} ${styles.reveal}`}>
              <Link href={href} className={styles.infusionPicture}>
                {product?.photo ? (
                  <Image image={product.photo} alt={product.photo.alt ?? name} ratio={1} sizes="(min-width: 1180px) 270px, (min-width: 640px) 45vw, 90vw" className={styles.infusionImage} />
                ) : (
                  <span className={styles.infusionArt}>
                    <Sprig className={styles.infusionSprig} />
                    <span className={styles.infusionCount}>{t(`about.infusions.items.${key}.herbs` as const)}</span>
                  </span>
                )}
              </Link>
              <div className={styles.infusionBody}>
                <p className={styles.infusionHerbs}>{t(`about.infusions.items.${key}.herbs` as const)}</p>
                <h3 className={styles.infusionName}>{name}</h3>
                <Link href={href} className={styles.infusionLink}>
                  {t('about.infusions.explore')}
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
      <p className={styles.center}>
        <Link href="/collections/all/" className={styles.buttonOutline}>
          {t('about.infusions.all')}
        </Link>
      </p>
    </section>
  )
}

const Value = ({ title, body, children }: { title: string; body: string; children: ReactNode }) => (
  <li className={`${styles.value} ${styles.reveal}`}>
    <span className={styles.valueIcon} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {children}
      </svg>
    </span>
    <h3 className={styles.valueTitle}>{title}</h3>
    <p className={styles.valueBody}>{body}</p>
  </li>
)

/** Section 10: the brand's philosophy in three cards. */
export const BrandValues = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="about-values">
      <div className={styles.narrow}>
        <SectionHead eyebrow={t('about.values.eyebrow')} title={t('about.values.title')} id="about-values" center />
      </div>
      <ul className={styles.values}>
        <Value title={t('about.values.natureTitle')} body={t('about.values.natureBody')}>
          <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14zM5 19l7-7" />
        </Value>
        <Value title={t('about.values.traditionTitle')} body={t('about.values.traditionBody')}>
          <path d="M4 5.5C6.5 4 9.5 4 12 6c2.5-2 5.5-2 8-.5V19c-2.5-1.5-5.5-1.5-8 .5-2.5-2-5.5-2-8-.5zM12 6v13.5" />
        </Value>
        <Value title={t('about.values.craftTitle')} body={t('about.values.craftBody')}>
          <path d="M4 11h16a8 8 0 01-16 0zM8 21h8M14 11l5-7M17 4l3 2" />
        </Value>
      </ul>
    </section>
  )
}

/** Section 11: the closing message on forest green, with the way to the collection. */
export const AboutClosingBanner = ({ children }: { children: ReactNode }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.closing} aria-labelledby="about-closing">
      <div className={styles.closingPicture}>{children}</div>
      <div className={styles.closingInner}>
        <h2 id="about-closing" className={styles.closingTitle}>
          {t('about.closing.title')}
        </h2>
        <span className={styles.ruleCenter} aria-hidden="true" />
        <p className={styles.closingText}>{t('about.closing.first')}</p>
        <p className={styles.closingText}>{t('about.closing.second')}</p>
        <div className={styles.closingActions}>
          <Link href="/#collections" className={styles.buttonGold}>
            {t('about.closing.collection')}
          </Link>
          <Link href="/collections/all/" className={styles.buttonGhost}>
            {t('about.closing.shop')}
          </Link>
        </div>
      </div>
    </section>
  )
}

type Line = 'address' | 'mobile' | 'phone' | 'email' | 'website'
const lines: readonly Line[] = ['address', 'mobile', 'phone', 'email', 'website']

/** Section 12: the founder's and company's contact details, as the client's documents give them. */
export const FounderContact = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="about-contact">
      <div className={`${styles.contactCard} ${styles.reveal}`}>
        <div className={styles.contactIntro}>
          <SectionHead eyebrow={t('about.contact.eyebrow')} title={t('about.contact.title')} id="about-contact" />
          <p className={styles.contactName}>{t('about.contact.name')}</p>
          <p className={styles.body}>{t('about.contact.qualifications')}</p>
          <p className={styles.contactClinic}>{t('about.contact.clinic')}</p>
        </div>
        <dl className={styles.contactList}>
          {lines.map((line) => (
            <div key={line} className={styles.contactRow}>
              <dt>{t(`about.contact.${line}Label` as const)}</dt>
              <dd>{t(`about.contact.${line}` as const)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
