import type { ReactNode } from 'react'
import { Image, Link, useCollections, useProducts, useStorefront, type CollectionCard } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { BrandMark, Sprig } from '../components/BrandMark'
import { TeaCard } from '../components/TeaCard'
import { cx } from '../components/cx'
import { slugOf } from '../components/slugOf'
import styles from '../styles/landing.module.css'

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

const SectionHead = ({ eyebrow, title, lead, align = 'center' }: { eyebrow: string; title: string; lead?: string; align?: 'center' | 'start' }) => (
  <div className={align === 'center' ? styles.head : cx(styles.head, styles.headStart)}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h2 className={styles.title}>{title}</h2>
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
    // Carries the #collections anchor the header and footer link to, now that the home page lists the teas themselves.
    <section id="collections" className={cx(styles.section, styles.productsBand, styles.anchor)}>
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

const Founder = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.founder} aria-labelledby="founder-title">
      <div className={styles.founderInner}>
        <div className={cx(styles.founderCard, styles.reveal)}>
          <Sprig className={styles.founderSprig} />
          <span className={styles.monogram} aria-hidden="true">
            {t('home.founder.monogram')}
          </span>
          <p className={styles.founderCardName}>{t('home.founder.signature')}</p>
          <p className={styles.founderCardRole}>{t('home.founder.credentials')}</p>
          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>{t('home.founder.factYearsLabel')}</dt>
              <dd className={styles.factValue}>{t('home.founder.factYears')}</dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factLabel}>{t('home.founder.factVarietiesLabel')}</dt>
              <dd className={styles.factValue}>{t('home.founder.factVarieties')}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.founderCopy}>
          <p className={styles.eyebrow}>{t('home.founder.eyebrow')}</p>
          <h2 id="founder-title" className={styles.title}>
            {t('home.founder.title')}
          </h2>
          <p className={styles.founderName}>{t('home.founder.name')}</p>
          <p className={styles.body}>{t('home.founder.first')}</p>
          <p className={styles.body}>{t('home.founder.second')}</p>
          <blockquote className={styles.quote}>
            <p>{t('home.founder.quote')}</p>
          </blockquote>
          <Link href="/about/" className={styles.ghost}>
            {t('home.founder.action')}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

const Range = ({ collections }: { collections: CollectionCard[] }) => {
  const { t } = useStorefront()
  const counted = collections.filter((c) => herbCounts.has(slugOf(c)))
  const ordered = [...counted].sort((a, b) => rangeOrder.indexOf(slugOf(a)) - rangeOrder.indexOf(slugOf(b)))
  if (!ordered.length) return null
  return (
    <section className={styles.range}>
      <div className={styles.rangeInner}>
        <SectionHead eyebrow={t('home.range.eyebrow')} title={t('home.range.title')} lead={t('home.range.lead')} />
        <ol className={styles.rangeList}>
          {ordered.map((c, index) => (
            <li key={c.id} className={styles.reveal}>
              <Link href={c.href} className={styles.rangeItem}>
                <span className={styles.rangeIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.rangeThumb}>{c.image ? <Image image={c.image} alt="" ratio={1} sizes="88px" className={styles.packImage} /> : null}</span>
                <span className={styles.rangeText}>
                  <span className={styles.rangeName}>{c.name}</span>
                  <span className={styles.rangeShop}>
                    {t('home.range.shop', { name: c.name })}
                    <ArrowIcon />
                  </span>
                </span>
                <span className={styles.rangeCount}>
                  <span className={styles.rangeNumber}>{herbCounts.get(slugOf(c))}</span>
                  <span className={styles.rangeLabel}>{t('home.range.herbs')}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const Learn = () => {
  const { t } = useStorefront()
  const articles: { key: string; tag: string; title: string; intro: string; body: string; art: ReactNode }[] = [
    {
      key: 'tisanes',
      tag: t('home.learn.tisanes.tag'),
      title: t('home.learn.tisanes.title'),
      intro: t('home.learn.tisanes.intro'),
      body: t('home.learn.tisanes.body'),
      art: (
        <>
          <path d="M30 58h52v10a26 26 0 01-52 0z" />
          <path d="M82 62h6a8 8 0 010 16h-8" />
          <path d="M24 98h70" />
          <path d="M46 48c-4-5 4-9 0-14M58 48c-4-5 4-9 0-14M70 48c-4-5 4-9 0-14" />
        </>
      ),
    },
    {
      key: 'herbs',
      tag: t('home.learn.herbs.tag'),
      title: t('home.learn.herbs.title'),
      intro: t('home.learn.herbs.intro'),
      body: t('home.learn.herbs.body'),
      art: (
        <>
          <path d="M60 102V40" />
          <path d="M60 70c-14-2-22-12-22-26 14 2 22 12 22 26z" />
          <path d="M60 58c12-2 20-11 20-24-12 2-20 11-20 24z" />
          <path d="M60 86c10 0 18-7 20-17-10 0-18 7-20 17z" />
          <circle cx="32" cy="92" r="5" />
          <circle cx="88" cy="94" r="4" />
          <path d="M84 30l8-8M28 34l-6-6" />
        </>
      ),
    },
    {
      key: 'routine',
      tag: t('home.learn.routine.tag'),
      title: t('home.learn.routine.title'),
      intro: t('home.learn.routine.intro'),
      body: t('home.learn.routine.body'),
      art: (
        <>
          <circle cx="60" cy="62" r="34" />
          <path d="M60 40v22l14 9" />
          <path d="M60 22v6M60 96v6M20 62h6M94 62h6" />
        </>
      ),
    },
  ]
  return (
    <section className={styles.section}>
      <SectionHead eyebrow={t('home.learn.eyebrow')} title={t('home.learn.title')} lead={t('home.learn.lead')} />
      <ul className={styles.learnGrid}>
        {articles.map((a) => (
          <li key={a.key} className={cx(styles.article, styles.reveal)}>
            <span className={styles.articleArt}>
              <svg className={styles.articleSvg} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
                {a.art}
              </svg>
            </span>
            <div className={styles.articleBody}>
              <span className={styles.articleTag}>{a.tag}</span>
              <h3 className={styles.articleTitle}>{a.title}</h3>
              <p className={styles.articleIntro}>{a.intro}</p>
              <details className={styles.articleMore}>
                <summary className={styles.articleSummary}>
                  <span className={styles.articleOpen}>{t('home.learn.more')}</span>
                  <span className={styles.articleClose}>{t('home.learn.less')}</span>
                  <ArrowIcon />
                </summary>
                <p className={styles.articleText}>{a.body}</p>
              </details>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.disclaimer}>{t('home.learn.note')}</p>
    </section>
  )
}

const Connect = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.connect}>
      <div className={cx(styles.connectInner, styles.reveal)}>
        <Sprig className={styles.connectSprig} />
        <Sprig className={styles.connectSprigAlt} />
        <p className={styles.eyebrow}>{t('home.connect.eyebrow')}</p>
        <h2 className={styles.title}>{t('home.connect.title')}</h2>
        <p className={styles.lead}>{t('home.connect.lead')}</p>
        <div className={cx(styles.actions, styles.actionsCenter)}>
          <Link href="/register/" className={styles.button}>
            {t('home.connect.action')}
            <ArrowIcon />
          </Link>
          <Link href="/contact/" className={styles.ghost}>
            {t('home.connect.contact')}
          </Link>
        </div>
        <Link href="/policies/privacy/" className={styles.privacy}>
          {t('home.connect.privacy')}
        </Link>
      </div>
    </section>
  )
}

export const HomePage = () => {
  // `first: 20` matches the header's request, so both share one answer.
  const { collections } = useCollections({ first: 20 })
  const find = (slug: string) => collections.find((c) => slugOf(c) === slug) ?? collections[rangeOrder.indexOf(slug)] ?? collections[0]
  return (
    <Layout>
      <Hero find={find} />
      <Trust />
      <Products />
      <Why find={find} />
      <Founder />
      <Range collections={collections} />
      <Learn />
      <Connect />
    </Layout>
  )
}
