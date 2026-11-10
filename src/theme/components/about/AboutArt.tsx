import type { ReactNode } from 'react'
import { Image, MerchantImage, useStorefront, type Photo } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import styles from '../../styles/aboutpage.module.css'

/** The page's picture places; each one's Storefront › Assets id and alt text are in content/en/about.json under images. */
export type PictureSlot = 'hero' | 'company' | 'founder' | 'brewing' | 'journey' | 'website' | 'closing'

/** Each place's shape (width over height) and how wide it shows, for core's image sizes. */
const frames: Record<PictureSlot, { ratio: number; sizes: string }> = {
  hero: { ratio: 0.8, sizes: '(min-width: 960px) 460px, 90vw' },
  company: { ratio: 0.85, sizes: '(min-width: 960px) 520px, 100vw' },
  founder: { ratio: 0.8, sizes: '(min-width: 960px) 420px, 90vw' },
  brewing: { ratio: 1, sizes: '(min-width: 960px) 480px, 100vw' },
  journey: { ratio: 1, sizes: '(min-width: 960px) 440px, 90vw' },
  website: { ratio: 1.5, sizes: '(min-width: 960px) 480px, 100vw' },
  closing: { ratio: 2.4, sizes: '100vw' },
}

/** The ids of the page's section headings, which its sections are labelled by. */
export type HeadId = 'about-company' | 'about-story' | 'about-founder' | 'about-brewing' | 'about-journey' | 'about-why' | 'about-website' | 'about-infusions' | 'about-values' | 'about-contact'

/** A fine-line sprig of leaves, the page's botanical mark. */
export const Sprig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M60 158C58 110 62 60 88 6" />
    <path d="M61 128c-18-4-30-16-34-34 18 2 31 14 34 34zM62 100c16-6 26-19 28-36-16 4-27 17-28 36zM64 72c-14-6-22-18-22-33 14 5 21 17 22 33zM70 46c12-6 19-16 20-29-12 4-19 14-20 29z" />
  </svg>
)

/** A cup with rising steam and two leaves, drawn in a fine line, for a place with no picture yet. */
const Cup = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M38 78h74v14a37 37 0 01-74 0z" />
    <path d="M112 84h8a12 12 0 010 24h-11" />
    <path d="M30 132h96" />
    <path d="M62 64c-6-8 6-12 0-22M78 62c-6-8 6-12 0-22M94 64c-6-8 6-12 0-22" />
    <path d="M118 46c-14 2-22 12-22 24 13-2 21-11 22-24zM96 70l12-12" />
  </svg>
)

/**
 * One of the page's pictures: the merchant's own from Storefront › Assets once its id is written in, else a store
 * photograph the page passes in, else a botanical drawing on the brand's colours. Never an invented portrait.
 */
export const AboutPicture = ({ slot, fallback, className }: { slot: PictureSlot; fallback?: Photo | null; className?: string }) => {
  const { t } = useStorefront()
  const { ratio, sizes } = frames[slot]
  const id = uploaded(t(`about.images.ids.${slot}` as const))
  if (id) return <MerchantImage asset={id} alt={t(`about.images.alt.${slot}` as const)} ratio={ratio} sizes={sizes} className={className} />
  if (fallback) return <Image image={fallback} alt="" ratio={ratio} sizes={sizes} className={className} />
  return (
    <span className={styles.drawing}>
      <Cup className={styles.drawingCup} />
    </span>
  )
}

/** A section's small gold label, its serif heading and the ornament under it. */
export const SectionHead = ({ eyebrow, title, id, center, light, children }: { eyebrow: string; title: string; id?: HeadId; center?: boolean; light?: boolean; children?: ReactNode }) => (
  <div className={`${styles.head} ${center ? styles.headCenter : ''} ${light ? styles.headLight : ''}`}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h2 id={id} className={styles.title}>
      {title}
    </h2>
    <span className={styles.rule} aria-hidden="true" />
    {children}
  </div>
)
