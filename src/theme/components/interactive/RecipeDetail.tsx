'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { Link, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { MethodIcon, TeaPicture } from '../herbalrecipes/HerbalRecipesSections'
import { isIced, linesOf, methods, recipeAnchor, type MethodKey, type TeaKey } from '../herbalRecipes'
import styles from '../../styles/herbalrecipes.module.css'

/**
 * The four preparation tabs: one is chosen at a time and only its method shows. Arrow keys, Home and End move between
 * the tabs, as a tab list does.
 */
export const RecipePreparationTabs = ({ tea, method, onMethod }: { tea: TeaKey; method: MethodKey; onMethod: (method: MethodKey) => void }) => {
  const { t } = useStorefront()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const at = methods.indexOf(method)
  const move = (index: number) => {
    const next = methods[(index + methods.length) % methods.length]
    if (!next) return
    onMethod(next)
    tabs.current[methods.indexOf(next)]?.focus()
  }
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = new Map([
      ['ArrowRight', at + 1],
      ['ArrowDown', at + 1],
      ['ArrowLeft', at - 1],
      ['ArrowUp', at - 1],
      ['Home', 0],
      ['End', methods.length - 1],
    ]).get(event.key)
    if (target === undefined) return
    event.preventDefault()
    move(target)
  }
  return (
    <div className={styles.tabs} role="tablist" aria-label={t('herbalrecipes.detail.tabs')} onKeyDown={keys}>
      {methods.map((m, i) => (
        <button
          key={m}
          ref={(el) => {
            tabs.current[i] = el
          }}
          type="button"
          role="tab"
          id={`tab-${tea}-${m}`}
          aria-selected={m === method}
          aria-controls={`panel-${tea}`}
          tabIndex={m === method ? 0 : -1}
          className={m === method ? `${styles.tab} ${styles.tabOn} ${isIced(m) ? styles.tabIced : ''}` : styles.tab}
          onClick={() => onMethod(m)}
        >
          <MethodIcon method={m} className={styles.tabIcon} />
          <span>{t(`herbalrecipes.methods.${m}.tab` as const)}</span>
        </button>
      ))}
    </div>
  )
}

/** What you need and the numbered method for one tea prepared one way, as the client's document states it. */
export const RecipeInstructionSteps = ({ tea, method }: { tea: TeaKey; method: MethodKey }) => {
  const { t } = useStorefront()
  const items = linesOf(t(`herbalrecipes.needs.${tea}.${method}` as const))
  const steps = linesOf(t(`herbalrecipes.steps.${tea}.${method}` as const))
  return (
    <div className={styles.instructions}>
      <h4 className={styles.panelTitle}>
        <MethodIcon method={method} className={styles.panelIcon} />
        {t(`herbalrecipes.methods.${method}.title` as const)}
      </h4>
      <div className={styles.instructionColumns}>
        <div>
          <h5 className={styles.label}>{t('herbalrecipes.detail.items')}</h5>
          <ul className={styles.items}>
            {items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className={styles.label}>{t('herbalrecipes.detail.steps')}</h5>
          <ol className={styles.steps}>
            {steps.map((line) => (
              <li key={line} className={styles.step}>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

/** The notes at the foot of the client's document, the same for every way of preparing that tea. */
export const RecipeNotes = ({ tea }: { tea: TeaKey }) => {
  const { t } = useStorefront()
  return (
    <aside className={styles.notes} aria-label={t('herbalrecipes.detail.notes')}>
      <p className={styles.notesTitle}>{t('herbalrecipes.detail.notes')}</p>
      <ul className={styles.notesList}>
        {linesOf(t(`herbalrecipes.items.${tea}.notes` as const)).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </aside>
  )
}

/** Beside the recipe: the tea's pack, the serving, and its product page while it's on sale. */
export const RelatedProductCTA = ({ tea, card }: { tea: TeaKey; card: ProductCard | undefined }) => {
  const { t } = useStorefront()
  return (
    <div className={styles.related}>
      <div className={styles.relatedPicture}>
        <TeaPicture tea={tea} card={card} place="detail" className={styles.contain} />
      </div>
      <dl className={styles.serving}>
        <dt>{t('herbalrecipes.detail.serving')}</dt>
        <dd>{t('herbalrecipes.detail.servingValue')}</dd>
      </dl>
      {card ? (
        <>
          <p className={styles.relatedTitle}>{t('herbalrecipes.detail.shopTitle')}</p>
          <Link href={card.href} className={styles.primary}>
            {t('herbalrecipes.detail.shop')}
          </Link>
        </>
      ) : null}
    </div>
  )
}

/** One tea's full recipe: its heading, the four tabs with the chosen method, its notes, and its product beside it. */
export const RecipeDetail = ({ tea, card, flip }: { tea: TeaKey; card: ProductCard | undefined; flip: boolean }) => {
  const { t } = useStorefront()
  const [method, setMethod] = useState<MethodKey>('hotMilk')
  const headingId = `${recipeAnchor(tea)}-title`
  return (
    <section id={recipeAnchor(tea)} className={flip ? `${styles.detail} ${styles.detailFlip}` : styles.detail} aria-labelledby={headingId}>
      <RelatedProductCTA tea={tea} card={card} />
      <div className={styles.detailMain}>
        <h3 id={headingId} className={styles.detailTitle}>
          {t(`herbalrecipes.items.${tea}.heading` as const)}
        </h3>
        <RecipePreparationTabs tea={tea} method={method} onMethod={setMethod} />
        <div id={`panel-${tea}`} role="tabpanel" aria-labelledby={`tab-${tea}-${method}`} className={styles.panel}>
          <RecipeInstructionSteps tea={tea} method={method} />
        </div>
        <RecipeNotes tea={tea} />
        <Link href="#recipes" className={styles.back}>
          {t('herbalrecipes.detail.back')}
        </Link>
      </div>
    </section>
  )
}
