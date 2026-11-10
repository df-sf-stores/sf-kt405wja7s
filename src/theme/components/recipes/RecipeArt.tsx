import type { ReactNode } from 'react'
import { Image, MerchantImage, useStorefront, type Photo } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import type { ReasonKey } from './recipes'
import styles from '../../styles/recipes.module.css'

/** The page's picture places; each one's Storefront › Assets id and alt text are in content/en/recipes.json under images. */
export type RecipeSlot = 'hero' | 'heroCold' | 'intro' | 'hotMilk' | 'hotWater' | 'coldShake' | 'iced' | 'menuHerbal' | 'menuGinger' | 'menuShake' | 'menuIced'

/** The store's own collection photographs of the two teas the recipes use, standing in until the client's pictures are in. */
export type TeaPhotos = { herbal: Photo | null; ginger: Photo | null }

/** Each place's shape (width over height), how wide it shows, and whether it holds a hot or a cold drink. */
const frames: Record<RecipeSlot, { ratio: number; sizes: string; cold: boolean }> = {
  hero: { ratio: 0.8, sizes: '(min-width: 960px) 380px, 70vw', cold: false },
  heroCold: { ratio: 0.75, sizes: '(min-width: 960px) 240px, 44vw', cold: true },
  intro: { ratio: 0.85, sizes: '(min-width: 960px) 520px, 100vw', cold: false },
  hotMilk: { ratio: 0.9, sizes: '(min-width: 960px) 480px, 100vw', cold: false },
  hotWater: { ratio: 0.9, sizes: '(min-width: 960px) 480px, 100vw', cold: false },
  coldShake: { ratio: 1.5, sizes: '(min-width: 960px) 560px, 100vw', cold: true },
  iced: { ratio: 1.5, sizes: '(min-width: 960px) 560px, 100vw', cold: true },
  menuHerbal: { ratio: 1, sizes: '(min-width: 1180px) 270px, (min-width: 640px) 46vw, 92vw', cold: false },
  menuGinger: { ratio: 1, sizes: '(min-width: 1180px) 270px, (min-width: 640px) 46vw, 92vw', cold: false },
  menuShake: { ratio: 1, sizes: '(min-width: 1180px) 270px, (min-width: 640px) 46vw, 92vw', cold: true },
  menuIced: { ratio: 1, sizes: '(min-width: 1180px) 270px, (min-width: 640px) 46vw, 92vw', cold: true },
}

/** The ids of the page's section headings, which its sections are labelled by. */
export type HeadId = 'recipes-intro' | 'recipes-hot' | 'recipes-cold' | 'recipes-menu' | 'recipes-why' | 'recipes-cta'

/** A fine-line sprig of leaves, the page's botanical mark. */
export const Sprig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M60 158C58 110 62 60 88 6" />
    <path d="M61 128c-18-4-30-16-34-34 18 2 31 14 34 34zM62 100c16-6 26-19 28-36-16 4-27 17-28 36zM64 72c-14-6-22-18-22-33 14 5 21 17 22 33zM70 46c12-6 19-16 20-29-12 4-19 14-20 29z" />
  </svg>
)

/** A glass cup of tea with rising steam and a leaf. */
const HotCup = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M46 70h62l-6 58a8 8 0 01-8 7H60a8 8 0 01-8-7z" />
    <path d="M50 92h54" opacity="0.5" />
    <path d="M108 82h6a11 11 0 010 22h-8" />
    <path d="M64 58c-6-8 6-12 0-22M80 56c-6-8 6-12 0-22M96 58c-6-8 6-12 0-22" />
    <path d="M124 128c-12 0-20-7-22-18 12 0 20 7 22 18zM102 110l14 10" />
  </svg>
)

/** A tall glass of iced tea with ice cubes and a straw. */
const IcedGlass = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M52 40h56l-8 96a7 7 0 01-7 6H67a7 7 0 01-7-6z" />
    <path d="M55 70h50" opacity="0.5" />
    <path d="M64 80l12-4 4 12-12 4zM82 96l12-3 3 12-12 3zM66 104l11-2 2 11-11 2z" />
    <path d="M92 40l14-26h10" />
    <path d="M118 66c-11 2-18 10-18 20 11-1 17-9 18-20z" />
  </svg>
)

/**
 * One of the page's pictures: the client's own from Storefront › Assets once its id is written in, else the store's
 * photograph of the tea it shows, else a fine-line drawing of a hot cup or an iced glass on the brand's colours.
 */
export const RecipePicture = ({ slot, fallback, className }: { slot: RecipeSlot; fallback?: Photo | null; className?: string }) => {
  const { t } = useStorefront()
  const { ratio, sizes, cold } = frames[slot]
  const id = uploaded(t(`recipes.images.ids.${slot}` as const))
  if (id) return <MerchantImage asset={id} alt={t(`recipes.images.alt.${slot}` as const)} ratio={ratio} sizes={sizes} className={className} />
  if (fallback) return <Image image={fallback} alt="" ratio={ratio} sizes={sizes} className={className} />
  return <span className={cold ? `${styles.drawing} ${styles.drawingCold}` : styles.drawing}>{cold ? <IcedGlass className={styles.drawingArt} /> : <HotCup className={styles.drawingArt} />}</span>
}

/** A section's small gold label, its serif heading, the ornament under it and an optional lead. */
export const SectionHead = ({ eyebrow, title, id, center, light, children }: { eyebrow: string; title: string; id: HeadId; center?: boolean; light?: boolean; children?: ReactNode }) => (
  <div className={`${styles.head} ${center ? styles.headCenter : ''} ${light ? styles.headLight : ''}`}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h2 id={id} className={styles.title}>
      {title}
    </h2>
    <span className={styles.rule} aria-hidden="true" />
    {children}
  </div>
)

/** A small steam or snowflake glyph for a recipe's hot or cold badge. */
export const TemperatureIcon = ({ cold, className }: { cold: boolean; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {cold ? <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5" /> : <path d="M8 4c-1.5 2 1.5 3 0 5M12 3c-1.5 2 1.5 3 0 5M16 4c-1.5 2 1.5 3 0 5M4 12h16l-1.5 6a3 3 0 01-3 2.3h-7A3 3 0 015.5 18z" />}
  </svg>
)

/** A line icon for each of the five brand points. */
export const ReasonIcon = ({ kind, className }: { kind: ReasonKey; className?: string }) => {
  const paths: Record<ReasonKey, ReactNode> = {
    caffeine: (
      <>
        <path d="M5 10h11v4a5.5 5.5 0 01-11 0z" />
        <path d="M16 11h1.5a2.5 2.5 0 010 5H16" />
        <path d="M3 3l18 18" />
      </>
    ),
    tannin: (
      <>
        <path d="M12 3s6 6.4 6 11a6 6 0 01-12 0c0-4.6 6-11 6-11z" />
        <path d="M9 14.5l2 2 4-4" />
      </>
    ),
    leaves: (
      <>
        <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
        <path d="M5 19l8-8" />
      </>
    ),
    varieties: (
      <>
        <path d="M4 8h7v10a2 2 0 01-2 2H6a2 2 0 01-2-2zM13 8h7v10a2 2 0 01-2 2h-3a2 2 0 01-2-2z" />
        <path d="M6 5.5c0-1 1-1.5 1.5-2.5M15.5 5.5c0-1 1-1.5 1.5-2.5" />
      </>
    ),
    serving: (
      <>
        <path d="M3 9h8l-1 10H4zM14 6h7l-1.2 13h-4.6z" />
        <path d="M5 6.5c0-1 1-1.5 1-2.5M8 6.5c0-1 1-1.5 1-2.5M15.5 11h4" />
      </>
    ),
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[kind]}
    </svg>
  )
}
