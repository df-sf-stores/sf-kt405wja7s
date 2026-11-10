'use client'

import { useEffect, useState } from 'react'
import { useLocation, useStorefront } from '@dripfunnel/storefront-core/theme'
import { featured, filterProducts, longAfter, paragraphsOf, productFromQuery, testimonials, type Language, type ProductKey, type Testimonial } from '../testimonials'
import styles from '../../styles/testimonials.module.css'

/** One testimonial's words in one language: who shared it, where from, and what they said. */
const useWords = (item: Testimonial, lang: Language) => {
  const { t } = useStorefront()
  return {
    name: t(`testimonials.items.${item.id}.${lang}.name` as const),
    place: t(`testimonials.items.${item.id}.${lang}.place` as const),
    paragraphs: paragraphsOf(t(`testimonials.items.${item.id}.${lang}.text` as const)),
    product: lang === 'hi' ? t(`testimonials.productsHi.${item.product}` as const) : t(`testimonials.products.${item.product}` as const),
  }
}

/** A quotation mark drawn in a fine line, the cards' mark. */
const QuoteMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 36" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M0 36V22C0 10 6 2 18 0l2 5C13 7 10 12 10 18h8v18zm28 0V22c0-12 6-20 18-22l2 5c-7 2-10 7-10 13h8v18z" />
  </svg>
)

/**
 * One testimonial, word for word. A long one shows its opening with Read More, which shows every word in place and
 * becomes Read Less; nothing is ever cut from the words themselves.
 */
export const TestimonialCard = ({ item, lang }: { item: Testimonial; lang: Language }) => {
  const { t } = useStorefront()
  const words = useWords(item, lang)
  const [open, setOpen] = useState(false)
  const long = words.paragraphs.length > 1 || words.paragraphs.join(' ').length > longAfter
  const bodyId = `testimonial-${item.id}-${lang}`
  return (
    <figure className={styles.card}>
      <QuoteMark className={styles.quoteMark} />
      <p className={styles.cardProduct} lang={lang}>
        {words.product}
      </p>
      <blockquote id={bodyId} className={long && !open ? `${styles.quote} ${styles.quoteClamped}` : styles.quote} lang={lang}>
        {words.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </blockquote>
      {long ? (
        <button type="button" className={styles.more} aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen(!open)}>
          {open ? t('testimonials.card.less') : t('testimonials.card.more')}
        </button>
      ) : null}
      <figcaption className={styles.person} lang={lang}>
        <span className={styles.personName}>{words.name}</span>
        <span className={styles.personPlace}>{words.place}</span>
      </figcaption>
    </figure>
  )
}

/** A few short stories, one at a time, moved only by the shopper's own Previous and Next; never on a timer. */
export const FeaturedTestimonials = ({ lang }: { lang: Language }) => {
  const { t } = useStorefront()
  const items = featured.flatMap((id) => testimonials.filter((x) => x.id === id))
  const [index, setIndex] = useState(0)
  const item = items[index]
  if (!item) return null
  const total = items.length
  const go = (step: number) => setIndex((index + step + total) % total)
  return (
    <section className={styles.featured} aria-labelledby="testimonials-featured" aria-roledescription={t('testimonials.featured.title')}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>{t('testimonials.featured.eyebrow')}</p>
        <h2 id="testimonials-featured" className={styles.title}>
          {t('testimonials.featured.title')}
        </h2>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <div className={styles.carousel}>
        <button type="button" className={styles.step} onClick={() => go(-1)} aria-label={t('testimonials.featured.previous')}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <div className={styles.slide} aria-live="polite">
          <FeaturedSlide key={`${item.id}-${lang}`} item={item} lang={lang} />
          <p className={styles.position}>{t('testimonials.featured.position', { n: items.slice(0, index + 1).length, total })}</p>
        </div>
        <button type="button" className={styles.step} onClick={() => go(1)} aria-label={t('testimonials.featured.next')}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

const FeaturedSlide = ({ item, lang }: { item: Testimonial; lang: Language }) => {
  const words = useWords(item, lang)
  return (
    <figure className={styles.slideFigure}>
      <QuoteMark className={styles.slideMark} />
      <blockquote className={styles.slideQuote} lang={lang}>
        {words.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </blockquote>
      <figcaption className={styles.slidePerson} lang={lang}>
        <span className={styles.personName}>{words.name}</span>
        <span className={styles.personPlace}>
          {words.place}
          <span className={styles.slideProduct}>{words.product}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** All Testimonials and one button per product with testimonials; the chosen one is pressed. */
export const TestimonialsFilter = ({ product, onProduct }: { product: ProductKey | null; onProduct: (product: ProductKey | null) => void }) => {
  const { t } = useStorefront()
  return (
    <div className={styles.filter} role="group" aria-label={t('testimonials.explore.products')}>
      <button type="button" className={product === null ? `${styles.pill} ${styles.pillOn}` : styles.pill} aria-pressed={product === null} onClick={() => onProduct(null)}>
        {t('testimonials.explore.all')}
      </button>
      {filterProducts.map((p) => (
        <button key={p} type="button" className={product === p ? `${styles.pill} ${styles.pillOn}` : styles.pill} aria-pressed={product === p} onClick={() => onProduct(p)}>
          {t(`testimonials.products.${p}` as const)}
        </button>
      ))}
    </div>
  )
}

/** English or हिंदी: which of the client's two documents the testimonials are read from. */
export const TestimonialsLanguageSelector = ({ lang, onLang }: { lang: Language; onLang: (lang: Language) => void }) => {
  const { t } = useStorefront()
  return (
    <div className={styles.language} role="group" aria-label={t('testimonials.explore.language')}>
      <button type="button" lang="en" className={lang === 'en' ? `${styles.languageButton} ${styles.languageOn}` : styles.languageButton} aria-pressed={lang === 'en'} onClick={() => onLang('en')}>
        {t('testimonials.explore.english')}
      </button>
      <button type="button" lang="hi" className={lang === 'hi' ? `${styles.languageButton} ${styles.languageOn}` : styles.languageButton} aria-pressed={lang === 'hi'} onClick={() => onLang('hi')}>
        {t('testimonials.explore.hindi')}
      </button>
    </div>
  )
}

/** The chosen product's testimonials, or all of them, in the chosen language, in the documents' order. */
export const TestimonialsGrid = ({ product, lang }: { product: ProductKey | null; lang: Language }) => (
  <div className={styles.grid}>
    {testimonials
      .filter((x) => product === null || x.product === product)
      .map((x) => (
        <TestimonialCard key={`${x.id}-${lang}`} item={x} lang={lang} />
      ))}
  </div>
)

/**
 * The page's interactive part: the featured stories, then the filter, the language selector and the grid. The product
 * and the language are chosen apart, so switching language keeps the product. A product page links here with
 * `?product={key}`, and `?lang=hi` opens it in Hindi.
 */
export const TestimonialsExplorer = () => {
  const { t } = useStorefront()
  const { query } = useLocation()
  const asked = productFromQuery(query.get('product'))
  const askedLang: Language = query.get('lang') === 'hi' ? 'hi' : 'en'
  const [product, setProduct] = useState<ProductKey | null>(asked)
  const [lang, setLang] = useState<Language>(askedLang)
  useEffect(() => setProduct(asked), [asked])
  useEffect(() => setLang(askedLang), [askedLang])
  const count = testimonials.filter((x) => product === null || x.product === product).length
  return (
    <>
      <FeaturedTestimonials lang={lang} />
      <section id="testimonials" className={styles.explore} aria-labelledby="testimonials-explore">
        <div className={styles.head}>
          <p className={styles.eyebrow}>{t('testimonials.explore.eyebrow')}</p>
          <h2 id="testimonials-explore" className={styles.title}>
            {t('testimonials.explore.title')}
          </h2>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <div className={styles.controls}>
          <TestimonialsFilter product={product} onProduct={setProduct} />
          <TestimonialsLanguageSelector lang={lang} onLang={setLang} />
        </div>
        <p className={styles.count} role="status">
          {t('testimonials.explore.count', { count })}
        </p>
        <TestimonialsGrid product={product} lang={lang} />
      </section>
    </>
  )
}
