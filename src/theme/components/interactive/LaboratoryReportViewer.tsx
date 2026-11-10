'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/labreports.module.css'

export type ReportViewerItem = { key: string; asset: string; title: string; issued: string }

/** Fit to the screen first, then three steps up; the bigger steps scroll inside the viewer. */
const zooms = [styles.zoomFit, styles.zoom150, styles.zoom200, styles.zoom300] as const

/**
 * A large viewer for one report page at a time: the original page whole on fit, then zoomed to read the table, with
 * previous and next across the reports. Fitted, the left and right arrows change report; zoomed, the arrows scroll the page.
 * Escape closes it; focus starts on Close and stays inside while it's open. `full` opens it zoomed all the way in.
 */
export const LaboratoryReportViewer = ({ items, index, onIndex, onClose, full = false }: { items: ReportViewerItem[]; index: number; onIndex: (index: number) => void; onClose: () => void; full?: boolean }) => {
  const { t } = useStorefront()
  // "View Full Report" opens at the largest zoom, so the table reads at the original's full resolution straight away.
  const [zoom, setZoom] = useState(full ? zooms.length - 1 : 0)
  const first = useRef<HTMLButtonElement>(null)
  const last = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    first.current?.focus()
  }, [])
  const item = items[index]
  if (!item) return null
  const total = items.length
  const go = (step: number) => {
    setZoom(0)
    onIndex((index + step + total) % total)
  }
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
    } else if (zoom === 0 && total > 1 && event.key === 'ArrowRight') go(1)
    else if (zoom === 0 && total > 1 && event.key === 'ArrowLeft') go(-1)
  }
  const n = items.slice(0, index + 1).length
  return (
    <div className={styles.backdrop} onKeyDown={keys}>
      <div className={styles.viewer} role="dialog" aria-modal="true" aria-labelledby="report-viewer-title">
        <span tabIndex={0} className={styles.sentinel} onFocus={() => (last.current ?? first.current)?.focus()} />
        <div className={styles.viewerBar}>
          <div className={styles.viewerHeading}>
            <h2 id="report-viewer-title" className={styles.viewerTitle}>
              {item.title}
            </h2>
            <p className={styles.viewerMeta}>
              <span>{t('labreports.viewer.position', { n, total })}</span>
              <span>{t('labreports.viewer.issued', { date: item.issued })}</span>
            </p>
          </div>
          <div className={styles.viewerTools}>
            <button type="button" className={styles.tool} onClick={() => setZoom(Math.max(0, zoom - 1))} disabled={zoom === 0} aria-label={t('labreports.viewer.zoomOut')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 12h12" />
              </svg>
            </button>
            <button type="button" className={styles.toolText} onClick={() => setZoom(0)} disabled={zoom === 0}>
              {t('labreports.viewer.fit')}
            </button>
            <button type="button" className={styles.tool} onClick={() => setZoom(Math.min(zooms.length - 1, zoom + 1))} disabled={zoom === zooms.length - 1} aria-label={t('labreports.viewer.zoomIn')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 12h12M12 6v12" />
              </svg>
            </button>
            <button ref={first} type="button" className={styles.closeButton} onClick={onClose} aria-label={t('labreports.viewer.close')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.stage}>
          {total > 1 ? (
            <button type="button" className={`${styles.step} ${styles.stepPrev}`} onClick={() => go(-1)} aria-label={t('labreports.viewer.previous')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          ) : null}
          <div className={styles.viewerScroll} tabIndex={0} aria-label={t('labreports.viewer.hint')}>
            <div key={item.key} className={`${styles.viewerSheet} ${zooms[zoom]}`}>
              <MerchantImage asset={item.asset} alt={item.title} ratio={0.7} sizes="(min-width: 1200px) 1600px, 100vw" className={styles.viewerImage} />
            </div>
          </div>
          {total > 1 ? (
            <button ref={last} type="button" className={`${styles.step} ${styles.stepNext}`} onClick={() => go(1)} aria-label={t('labreports.viewer.next')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : null}
        </div>
        <p className={styles.viewerHint}>{t('labreports.viewer.hint')}</p>
        <span tabIndex={0} className={styles.sentinel} onFocus={() => first.current?.focus()} />
      </div>
    </div>
  )
}
