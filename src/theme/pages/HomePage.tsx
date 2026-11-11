import type { ReactNode } from 'react'
import { Image, Link, useCollections, useProducts, useStorefront, type CollectionCard } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { BrandMark, Sprig } from '../components/BrandMark'
import { TeaCard } from '../components/TeaCard'
import { HomeCertificates } from '../components/interactive/HomeCertificates'
import { HomeLabReports } from '../components/interactive/HomeLabReports'
import { TestimonialCard } from '../components/interactive/TestimonialsExplorer'
import { MethodIcon } from '../components/herbalrecipes/HerbalRecipesSections'
import { isIced, linesOf, methods } from '../components/herbalRecipes'
import { featured, testimonials } from '../components/testimonials'
import { cx } from '../components/cx'
import { slugOf } from '../components/slugOf'
import styles from '../styles/landing.module.css'
import home from '../styles/homesections.module.css'

/**
 * How many herbs each blend holds, as printed on its pack ("27 herbs infusion / tisane"), by its collection's address.
 * A collection not listed here shows no count, so a new blend never borrows another's.
 */
const herbCounts = new Map<string, number>([
  ['herbal-tea', 20],
  ['cough-tea', 27],
  ['diabetic-tea', 27],
  ['ginger-tea', 14],
  ['weight-loss-tea', 24],
  ['tulsi-tea', 16],
])

/** The range in the order the brand tells it, then any collection added since. */
const rangeOrder = ['herbal-tea', 'cough-tea', 'diabetic-tea', 'ginger-tea', 'weight-loss-tea', 'tulsi-tea']

/** A collection's place in the brand's order; one added since comes after. */
const rank = (slug: string) => (rangeOrder.includes(slug) ? rangeOrder.indexOf(slug) : rangeOrder.length)

const Icon = ({ className, children }: { className?: string; children: ReactNode }) => (
  <svg className={className ?? styles.lineIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

const ArrowIcon = () => (
  <Icon className={styles.arrow}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
)

/** The headings the sections name themselves by (aria-labelledby). */
type HeadId = 'collections-title' | 'recipes-title' | 'reviews-title'

const SectionHead = ({ id, eyebrow, title, lead, align = 'center' }: { id?: HeadId; eyebrow: string; title: string; lead?: string; align?: 'center' | 'start' }) => (
  <div className={align === 'center' ? styles.head : cx(styles.head, styles.headStart)}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h2 id={id} className={styles.title}>
      {title}
    </h2>
    {lead ? <p className={styles.lead}>{lead}</p> : null}
  </div>
)

/** A collection's pack on a soft ground, or the ground alone while it has no picture. */
const Pack = ({ collection, large = false, small = false, className }: { collection: CollectionCard | undefined; large?: boolean; small?: boolean; className?: string }) => (
  <span className={cx(styles.pack, className)}>
    {collection?.image ? <Image image={collection.image} alt={collection.name} ratio={1} sizes={large ? '(min-width: 1080px) 440px, 70vw' : small ? '160px' : '(min-width: 1080px) 240px, 40vw'} className={styles.packImage} /> : null}
  </span>
)

const Hero = ({ find }: { find: (slug: string) => CollectionCard | undefined }) => {
  const { store, t } = useStorefront()
  const main = find('herbal-tea')
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={cx(styles.eyebrow, styles.enter)}>{t('home.hero.eyebrow')}</p>
          <h1 className={cx(styles.heroTitle, styles.enter, styles.delay1)}>
            {t('home.hero.title')} <em className={styles.heroAccent}>{t('home.hero.accent')}</em>
          </h1>
          <p className={cx(styles.heroLead, styles.enter, styles.delay2)}>{t('home.hero.lead', { store: store.name })}</p>
          <div className={cx(styles.actions, styles.enter, styles.delay3)}>
            <Link href="/collections/all/" className={styles.button}>
              {t('home.hero.shop')}
              <ArrowIcon />
            </Link>
            <Link href="/about/" className={styles.ghost}>
              {t('home.hero.story')}
            </Link>
          </div>
          <p className={cx(styles.heroNote, styles.enter, styles.delay3)}>
            <Icon className={styles.noteIcon}>
              <path d="M7 17c-2-5 1-11 10-12 1 9-5 13-10 12zM7 17l6-6" />
            </Icon>
            {t('home.hero.note')}
          </p>
        </div>
        <div className={cx(styles.stage, styles.enterSoft)}>
          <span className={styles.stageArch} aria-hidden="true" />
          <span className={styles.stageSun} aria-hidden="true" />
          <Sprig className={styles.stageSprig} />
          <Sprig className={styles.stageSprigAlt} />
          <Pack collection={main} large className={styles.stageMain} />
          <Pack collection={find('tulsi-tea')} small className={styles.stageLeft} />
          <Pack collection={find('ginger-tea')} small className={styles.stageRight} />
          {main && herbCounts.get(slugOf(main)) ? (
            <span className={styles.stageBadge}>
              <span className={styles.stageBadgeNumber}>{herbCounts.get(slugOf(main))}</span>
              <span className={styles.stageBadgeText}>
                <span className={styles.stageBadgeLabel}>{t('home.range.herbs')}</span>
                <span>{t('home.hero.badge')}</span>
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}

const Trust = () => {
  const { t } = useStorefront()
  const items: { key: string; title: string; body: string; icon: ReactNode }[] = [
    {
      key: 'herbs',
      title: t('home.trust.herbs.title'),
      body: t('home.trust.herbs.body'),
      icon: <path d="M12 21V11M12 11c0-4 3-7 8-7 0 5-3 8-8 7zM12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 6.5 7 5.5z" />,
    },
    {
      key: 'caffeine',
      title: t('home.trust.caffeine.title'),
      body: t('home.trust.caffeine.body'),
      icon: <path d="M4 10h13v3a6.5 6.5 0 01-13 0zM17 11h1.5a2.5 2.5 0 010 5H16M9 3c-1 1.2 1 2.3 0 3.5M12.5 3c-1 1.2 1 2.3 0 3.5" />,
    },
    {
      key: 'ayurveda',
      title: t('home.trust.ayurveda.title'),
      body: t('home.trust.ayurveda.body'),
      icon: <path d="M12 4v4M12 20a6 6 0 006-6c0-3-2.5-4.5-6-6-3.5 1.5-6 3-6 6a6 6 0 006 6zM9 14.5h6M10 17.5h4" />,
    },
    {
      key: 'experience',
      title: t('home.trust.experience.title'),
      body: t('home.trust.experience.body'),
      icon: <path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7zM8 21h8" />,
    },
  ]
  return (
    <section className={styles.trust} aria-labelledby="trust-title">
      <h2 id="trust-title" className={styles.hidden}>
        {t('home.trust.title')}
      </h2>
      <ul className={styles.trustList}>
        {items.map((item) => (
          <li key={item.key} className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <Icon>{item.icon}</Icon>
            </span>
            <div>
              <h3 className={styles.trustTitle}>{item.title}</h3>
              <p className={styles.trustBody}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

const Products = () => {
  const { t } = useStorefront()
  const { status, products } = useProducts({ sort: 'best-selling', first: 6 })
  const none = status !== 'loading' && !products.length
  return (
    <section className={cx(styles.section, styles.productsBand)}>
      <div className={styles.headRow}>
        <SectionHead eyebrow={t('home.products.eyebrow')} title={t('home.products.title')} lead={t('home.products.lead')} align="start" />
        {none ? null : (
          <Link href="/collections/all/" className={styles.textLink}>
            {t('home.products.viewAll')}
            <ArrowIcon />
          </Link>
        )}
      </div>
      {status === 'loading' ? (
        <ul className={styles.productGrid} aria-busy="true" aria-label={t('home.products.loading')}>
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className={styles.cardSkeleton}>
              <span className={styles.cardSkeletonPicture} />
              <span className={styles.cardSkeletonLine} />
              <span className={styles.cardSkeletonLineShort} />
            </li>
          ))}
        </ul>
      ) : none ? (
        <div className={styles.emptyPanel}>
          <Sprig className={styles.emptySprig} />
          <p className={styles.emptyTitle}>{t('home.products.empty')}</p>
          <p className={styles.emptyLead}>{t('home.products.emptyLead')}</p>
          <Link href="/collections/all/" className={styles.ghost}>
            {t('home.products.emptyAction')}
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.productGrid}>
            {products.map((product) => (
              <li key={product.id} className={styles.reveal}>
                <TeaCard product={product} />
              </li>
            ))}
          </ul>
          <div className={styles.center}>
            <Link href="/collections/all/" className={styles.button}>
              {t('home.products.viewAll')}
              <ArrowIcon />
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

const Why = ({ find }: { find: (slug: string) => CollectionCard | undefined }) => {
  const { store, t } = useStorefront()
  const points: { key: string; title: string; body: string; icon: ReactNode }[] = [
    { key: 'combinations', title: t('home.why.combinations.title'), body: t('home.why.combinations.body'), icon: <path d="M9 3v6l-5 9a2 2 0 002 3h12a2 2 0 002-3l-5-9V3M8 3h8M7 15h10" /> },
    { key: 'ayurveda', title: t('home.why.ayurveda.title'), body: t('home.why.ayurveda.body'), icon: <path d="M4 20c0-8 5-14 16-16-1 11-7 16-16 16zM4 20l8-8" /> },
    { key: 'natural', title: t('home.why.natural.title'), body: t('home.why.natural.body'), icon: <path d="M12 21c-4.5 0-8-3-8-7.5C4 8 12 3 12 3s8 5 8 10.5c0 4.5-3.5 7.5-8 7.5zM12 21v-9" /> },
    { key: 'alternative', title: t('home.why.alternative.title'), body: t('home.why.alternative.body'), icon: <path d="M4 10h13v3a6.5 6.5 0 01-13 0zM17 11h1.5a2.5 2.5 0 010 5H16M4 4l16 16" /> },
  ]
  return (
    <section id="benefits" className={cx(styles.why, styles.anchor)}>
      <div className={styles.whyInner}>
        <figure className={cx(styles.whyPicture, styles.reveal)}>
          <span className={styles.whyGround} aria-hidden="true" />
          <Sprig className={styles.whySprig} />
          <span className={styles.whyGrid}>
            <Pack collection={find('cough-tea')} className={styles.whyPack} />
            <Pack collection={find('diabetic-tea')} className={cx(styles.whyPack, styles.whyPackLow)} />
            <Pack collection={find('weight-loss-tea')} className={styles.whyPack} />
            <Pack collection={find('tulsi-tea')} className={cx(styles.whyPack, styles.whyPackLow)} />
          </span>
          <figcaption className={styles.whyCaption}>
            <BrandMark className={styles.whyCaptionMark} />
            {t('home.why.caption')}
          </figcaption>
        </figure>
        <div className={styles.whyCopy}>
          <p className={styles.eyebrow}>{t('home.why.eyebrow', { store: store.name })}</p>
          <h2 className={styles.title}>
            {t('home.why.title')} <em className={styles.accentText}>{t('home.why.accent')}</em>
          </h2>
          <p className={styles.lead}>{t('home.why.lead', { store: store.name })}</p>
          <ul className={styles.points}>
            {points.map((p) => (
              <li key={p.key} className={styles.point}>
                <span className={styles.pointIcon}>
                  <Icon>{p.icon}</Icon>
                </span>
                <div>
                  <h3 className={styles.pointTitle}>{p.title}</h3>
                  <p className={styles.pointBody}>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/collections/all/" className={styles.button}>
            {t('home.why.action')}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Our Story: the brand, its founder and what inspired the blends, in the About page's own words, beside the packs. */
const OurStory = ({ find }: { find: (slug: string) => CollectionCard | undefined }) => {
  const { t } = useStorefront()
  return (
    <section id="our-story" className={cx(styles.founder, styles.anchor)} aria-labelledby="story-title">
      <div className={styles.founderInner}>
        <figure className={cx(home.storyArt, styles.reveal)}>
          <span className={home.storyGround} aria-hidden="true" />
          <Sprig className={home.storySprig} />
          <Pack collection={find('herbal-tea')} className={home.storyMain} />
          <Pack collection={find('tulsi-tea')} small className={home.storyLeft} />
          <Pack collection={find('ginger-tea')} small className={home.storyRight} />
          <figcaption className={home.storyBadge}>
            <BrandMark className={home.storyBadgeMark} />
            {t('about.hero.founded')}
          </figcaption>
        </figure>
        <div className={styles.founderCopy}>
          <p className={styles.eyebrow}>{t('about.hero.eyebrow')}</p>
          <h2 id="story-title" className={styles.title}>
            {t('about.hero.title')}
          </h2>
          <p className={styles.body}>{t('about.company.first')}</p>
          <div className={home.founderRow}>
            <span className={home.founderMonogram} aria-hidden="true">
              {t('about.founder.monogram')}
            </span>
            <p className={home.founderWho}>
              <span className={home.founderWhoName}>{t('about.founder.name')}</span>
              <span className={home.founderWhoRole}>{t('about.founder.qualifications')}</span>
            </p>
          </div>
          <p className={styles.body}>{t('about.founder.second')}</p>
          <p className={styles.body}>{t('about.journey.third')}</p>
          <dl className={home.storyFacts}>
            <div className={home.storyFact}>
              <dt>{t('about.company.factYearLabel')}</dt>
              <dd>{t('about.company.factYear')}</dd>
            </div>
            <div className={home.storyFact}>
              <dt>{t('home.story.practiceLabel')}</dt>
              <dd>{t('about.story.timeline.practiceYear')}</dd>
            </div>
            <div className={home.storyFact}>
              <dt>{t('about.company.factCountLabel')}</dt>
              <dd>{t('about.company.factCount')}</dd>
            </div>
          </dl>
          <Link href="/about/" className={styles.button}>
            {t('about.hero.story')}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Every collection with its pack, its description (or its herb count), and the way into it; the header links here. */
const Collections = ({ collections, pending }: { collections: CollectionCard[]; pending: boolean }) => {
  const { t } = useStorefront()
  const ordered = [...collections].sort((a, b) => rank(slugOf(a)) - rank(slugOf(b)))
  if (!pending && !ordered.length) return null
  return (
    <section id="collections" className={cx(styles.section, styles.anchor)} aria-labelledby="collections-title">
      <SectionHead id="collections-title" eyebrow={t('home.collections.eyebrow')} title={t('home.collections.title')} lead={t('home.collections.lead')} />
      <ul className={home.collectionGrid} aria-busy={pending} aria-label={pending ? t('home.collections.loading') : undefined}>
        {pending
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <span className={home.collectionSkeleton} />
              </li>
            ))
          : ordered.map((c) => {
              const herbs = herbCounts.get(slugOf(c))
              return (
                <li key={c.id} className={styles.reveal}>
                  <Link href={c.href} className={home.collection}>
                    <span className={home.collectionPicture}>
                      {c.image ? <Image image={c.image} alt="" ratio={1} sizes="(min-width: 1080px) 380px, (min-width: 700px) 45vw, 50vw" className={home.collectionImage} /> : null}
                    </span>
                    <span className={home.collectionText}>
                      <span className={home.collectionName}>{c.name}</span>
                      <span className={home.collectionDesc}>{c.description || (herbs ? t('home.collections.herbs', { count: herbs }) : t('home.collections.fallback'))}</span>
                      <span className={home.collectionMore}>
                        {t('home.collections.explore')}
                        <ArrowIcon />
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
      </ul>
    </section>
  )
}

/** The four ways to prepare a cup, with what goes into each, as the client's recipe for Herbal Tea gives them. */
const Recipes = ({ find }: { find: (slug: string) => CollectionCard | undefined }) => {
  const { t } = useStorefront()
  const tea = find('herbal-tea')
  return (
    <section className={cx(styles.section, home.recipesBand)} aria-labelledby="recipes-title">
      <SectionHead id="recipes-title" eyebrow={t('home.recipes.eyebrow')} title={t('herbalrecipes.hero.title')} lead={t('herbalrecipes.product.lead')} />
      <p className={home.recipesShown}>{t('home.recipes.shown', { tea: t('herbalrecipes.items.herbal.short') })}</p>
      <ul className={home.recipeGrid}>
        {methods.map((method) => (
          <li key={method} className={cx(home.recipe, styles.reveal)}>
            <div className={isIced(method) ? cx(home.recipeArt, home.recipeArtIced) : home.recipeArt}>
              {tea?.image ? <Image image={tea.image} alt={t('herbalrecipes.items.herbal.alt')} ratio={1} sizes="(min-width: 1080px) 160px, 30vw" className={home.recipePack} /> : null}
              <span className={home.recipeBadge}>
                <MethodIcon method={method} className={home.recipeIcon} />
                {isIced(method) ? t('home.recipes.iced') : t('home.recipes.hot')}
              </span>
            </div>
            <div className={home.recipeBody}>
              <h3 className={home.recipeTitle}>{t(`herbalrecipes.methods.${method}.title` as const)}</h3>
              <p className={home.recipeText}>{t(`herbalrecipes.methods.${method}.body` as const)}</p>
              <p className={home.recipeLabel}>{t('herbalrecipes.detail.items')}</p>
              <ul className={home.recipeNeeds}>
                {linesOf(t(`herbalrecipes.needs.herbal.${method}` as const)).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className={home.recipeServes}>
                {t('herbalrecipes.detail.serving')} <strong>{t('herbalrecipes.detail.servingValue')}</strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.center}>
        <Link href="/herbal-tea-recipes/" className={styles.button}>
          {t('home.recipes.all')}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  )
}

/** Three of the published customer stories, word for word as the client supplied them, with the page's own note. */
const Testimonials = () => {
  const { t } = useStorefront()
  const shown = featured.slice(0, 3).flatMap((id) => testimonials.filter((x) => x.id === id))
  return (
    <section className={cx(styles.section, home.reviewsBand)} aria-labelledby="reviews-title">
      <SectionHead id="reviews-title" eyebrow={t('home.reviews.eyebrow')} title={t('testimonials.hero.title')} lead={t('testimonials.hero.lead')} />
      <div className={home.reviewGrid}>
        {shown.map((item) => (
          <TestimonialCard key={item.id} item={item} lang="en" />
        ))}
      </div>
      <p className={home.reviewNote}>{t('testimonials.disclaimer.text')}</p>
      <div className={styles.center}>
        <Link href="/testimonials/" className={styles.button}>
          {t('home.reviews.all')}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  )
}

export const HomePage = () => {
  // `first: 20` matches the header's request, so both share one answer.
  const { collections, status } = useCollections({ first: 20 })
  const find = (slug: string) => collections.find((c) => slugOf(c) === slug) ?? collections[rangeOrder.indexOf(slug)] ?? collections[0]
  return (
    <Layout>
      <Hero find={find} />
      <Trust />
      <Why find={find} />
      <OurStory find={find} />
      <Collections collections={collections} pending={status === 'loading'} />
      <Products />
      <HomeCertificates />
      <Recipes find={find} />
      <HomeLabReports />
      <Testimonials />
    </Layout>
  )
}
