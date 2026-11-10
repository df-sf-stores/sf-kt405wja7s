'use client'

import { useRef } from 'react'
import { MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import type { ReportKey } from '../labReports'
import styles from '../../styles/labreports.module.css'

/**
 * One product's laboratory report: the original report page whole on an ivory mat, the product, the laboratory, the
 * report number and issue date as the report prints them, and the ways to view it. `asset` is null until the report's
 * image id is in the words file; the card then says the image is coming and offers no button that would do nothing.
 */
export const LaboratoryReportCard = ({ kind, asset, onView }: { kind: ReportKey; asset: string | null; onView: (full: boolean, returnFocus: () => void) => void }) => {
  const { t } = useStorefront()
  const view = useRef<HTMLButtonElement>(null)
  const product = t(`labreports.items.${kind}.product` as const)
  const titleId = `report-${kind}-title`
  const open = (full: boolean) => onView(full, () => view.current?.focus())
  return (
    <article id={`report-${kind}`} className={styles.card} aria-labelledby={titleId}>
      <div className={styles.mat}>
        {asset ? (
          <button type="button" className={styles.matButton} onClick={() => open(false)} aria-label={t(`labreports.items.${kind}.viewLabel` as const)}>
            <MerchantImage asset={asset} alt={t(`labreports.items.${kind}.alt` as const)} ratio={0.7} sizes="(min-width: 1200px) 360px, (min-width: 640px) 46vw, 92vw" className={styles.matImage} />
            <span className={styles.matZoom} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5M11 8v6M8 11h6" />
              </svg>
            </span>
          </button>
        ) : (
          <div className={styles.matEmpty}>
            <svg className={styles.matEmptyIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M18 6h12M20 6v12L10 38a3 3 0 002.7 4h22.6a3 3 0 002.7-4L28 18V6" />
              <path d="M14.5 30h19" />
            </svg>
            <p>{t('labreports.gallery.pending')}</p>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.badge}>
          <span className={styles.badgeLabel}>{t('labreports.card.lab')}</span>
          <span>{t('labreports.card.labName')}</span>
        </p>
        <h3 id={titleId} className={styles.cardTitle}>
          {product}
        </h3>
        <dl className={styles.details}>
          <div className={styles.detailRow}>
            <dt>{t('labreports.card.reportNo')}</dt>
            <dd>{t(`labreports.items.${kind}.reportNo` as const)}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>{t('labreports.card.issued')}</dt>
            <dd>{t(`labreports.items.${kind}.issued` as const)}</dd>
          </div>
        </dl>
        {asset ? (
          <div className={styles.actions}>
            <button ref={view} type="button" className={styles.primary} onClick={() => open(false)}>
              {t('labreports.card.view')}
            </button>
            <button type="button" className={styles.secondary} onClick={() => open(true)}>
              {t('labreports.card.full')}
            </button>
          </div>
        ) : null}
      </div>
    </article>
  )
}
