'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocation, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import { reportFromQuery, reports } from '../labReports'
import { LaboratoryReportCard } from './LaboratoryReportCard'
import { LaboratoryReportViewer, type ReportViewerItem } from './LaboratoryReportViewer'
import styles from '../../styles/labreports.module.css'

/**
 * The six report cards and the viewer they open, which steps through every report whose image is in. A product page
 * links here with `?report={key}`, which opens that product's report as the page loads.
 */
export const LaboratoryReportsGallery = () => {
  const { t } = useStorefront()
  const { query } = useLocation()
  const cards = reports.map((key) => ({ key, asset: uploaded(t(`labreports.assets.${key}` as const)) }))
  const items: ReportViewerItem[] = cards.flatMap((c) =>
    c.asset ? [{ key: c.key, asset: c.asset, title: t(`labreports.items.${c.key}.product` as const), issued: t(`labreports.items.${c.key}.issued` as const) }] : [],
  )
  const [open, setOpen] = useState<{ index: number; full: boolean } | null>(null)
  const returnTo = useRef<() => void>(undefined)

  const asked = reportFromQuery(query.get('report'))
  const askedIndex = items.findIndex((i) => i.key === asked)
  useEffect(() => {
    if (askedIndex >= 0) setOpen({ index: askedIndex, full: false })
  }, [askedIndex])

  const close = () => {
    setOpen(null)
    returnTo.current?.()
  }
  return (
    <section id="reports" className={styles.gallery} aria-labelledby="reports-gallery">
      <div className={styles.galleryHead}>
        <p className={styles.eyebrow}>{t('labreports.gallery.eyebrow')}</p>
        <h2 id="reports-gallery" className={styles.title}>
          {t('labreports.gallery.title')}
        </h2>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.headLead}>{t('labreports.gallery.lead')}</p>
      </div>
      <div className={styles.grid}>
        {cards.map((c) => (
          <LaboratoryReportCard
            key={c.key}
            kind={c.key}
            asset={c.asset}
            onView={(full, returnFocus) => {
              returnTo.current = returnFocus
              setOpen({ index: items.findIndex((i) => i.key === c.key), full })
            }}
          />
        ))}
      </div>
      {open !== null && open.index >= 0 ? (
        <LaboratoryReportViewer key={`${open.index}-${open.full}`} items={items} index={open.index} full={open.full} onIndex={(index) => setOpen({ index, full: false })} onClose={close} />
      ) : null}
    </section>
  )
}
