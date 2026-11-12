'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { fileOf } from '../certificates'
import { Picture, type ViewerPicture } from '../themeMedia'
import styles from '../../styles/certificates.module.css'

export type ViewerItem = ViewerPicture & { title: string }

/** Fit to the screen first, then three steps up; the bigger steps scroll inside the viewer. */
const zooms = [styles.zoomFit, styles.zoom150, styles.zoom200, styles.zoom300] as const

/**
 * A large viewer for one certificate at a time, with previous and next across the gallery, zoom, fit to screen and the
 * original file (for an uploaded picture). Arrow keys move between certificates; Escape or a click on the backdrop closes;
 * focus starts on Close and stays inside while open, and the page behind holds still.
 */
export const CertificateImageViewer = ({ items, index, onIndex, onClose }: { items: ViewerItem[]; index: number; onIndex: (index: number) => void; onClose: () => void }) => {
  const { t } = useStorefront()
  const [zoom, setZoom] = useState(0)
  const first = useRef<HTMLButtonElement>(null)
  const last = useRef<HTMLAnchorElement>(null)
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
    } else if (event.key === 'ArrowRight' && total > 1) go(1)
    else if (event.key === 'ArrowLeft' && total > 1) go(-1)
  }
  /** This certificate's place in the gallery, counted from the items themselves. */
  const n = items.slice(0, index + 1).length
  return (
    <div className={styles.backdrop} onKeyDown={keys} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className={styles.viewer} role="dialog" aria-modal="true" aria-labelledby="certificate-viewer-title">
        <span tabIndex={0} className={styles.sentinel} onFocus={() => (last.current ?? first.current)?.focus()} />
        <div className={styles.viewerBar}>
          <div className={styles.viewerHeading}>
            <h2 id="certificate-viewer-title" className={styles.viewerTitle}>
              {item.title}
            </h2>
            <p className={styles.viewerCount}>{t('certificates.viewer.position', { n, total })}</p>
          </div>
          <div className={styles.viewerTools}>
            <button type="button" className={styles.tool} onClick={() => setZoom(Math.max(0, zoom - 1))} disabled={zoom === 0} aria-label={t('certificates.viewer.zoomOut')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 12h12" />
              </svg>
            </button>
            <button type="button" className={styles.toolText} onClick={() => setZoom(0)} disabled={zoom === 0}>
              {t('certificates.viewer.fit')}
            </button>
            <button type="button" className={styles.tool} onClick={() => setZoom(Math.min(zooms.length - 1, zoom + 1))} disabled={zoom === zooms.length - 1} aria-label={t('certificates.viewer.zoomIn')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 12h12M12 6v12" />
              </svg>
            </button>
            <button ref={first} type="button" className={styles.closeButton} onClick={onClose} aria-label={t('certificates.viewer.close')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.stage}>
          {total > 1 ? (
            <button type="button" className={`${styles.step} ${styles.stepPrev}`} onClick={() => go(-1)} aria-label={t('certificates.viewer.previous')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          ) : null}
          <div className={styles.viewerScroll} tabIndex={0} aria-label={t('certificates.viewer.hint')}>
            <div key={item.asset ?? item.file} className={`${styles.viewerSheet} ${zooms[zoom]}`}>
              <Picture picture={item} alt={item.title} uploadRatio={0.75} sizes="(min-width: 1200px) 1200px, 100vw" className={styles.viewerImage} />
            </div>
          </div>
          {total > 1 ? (
            <button type="button" className={`${styles.step} ${styles.stepNext}`} onClick={() => go(1)} aria-label={t('certificates.viewer.next')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : null}
        </div>
        <div className={styles.viewerFoot}>
          <p className={styles.viewerHint}>{t('certificates.viewer.hint')}</p>
          {item.asset ? (
            <Link ref={last} href={fileOf(item.asset)} className={styles.viewerDownload}>
              {t('certificates.viewer.download')}
            </Link>
          ) : null}
        </div>
        <span tabIndex={0} className={styles.sentinel} onFocus={() => first.current?.focus()} />
      </div>
    </div>
  )
}
