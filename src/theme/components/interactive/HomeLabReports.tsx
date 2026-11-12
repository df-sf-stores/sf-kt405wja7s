'use client'

import { useRef, useState } from 'react'
import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { reports, type ReportKey } from '../labReports'
import { Picture, reportPicture, type ViewerPicture } from '../themeMedia'
import { LaboratoryReportViewer, type ReportViewerItem } from './LaboratoryReportViewer'
import styles from '../../styles/landing.module.css'
import home from '../../styles/homesections.module.css'

/** One product's report in brief: its first page, whole (which opens the viewer), the product, report number and date. */
const Card = ({ kind, picture, onView }: { kind: ReportKey; picture: ViewerPicture; onView: (returnFocus: () => void) => void }) => {
  const { t } = useStorefront()
  const button = useRef<HTMLButtonElement>(null)
  return (
    <li className={cx(home.report, styles.reveal)}>
      <div className={home.reportMat}>
        <button ref={button} type="button" className={home.reportButton} onClick={() => onView(() => button.current?.focus())} aria-label={t(`labreports.items.${kind}.viewLabel` as const)}>
          <Picture picture={picture} alt={t(`labreports.items.${kind}.alt` as const)} uploadRatio={0.7} sizes="(min-width: 1080px) 220px, (min-width: 700px) 30vw, 50vw" className={home.reportImage} />
        </button>
      </div>
      <div className={home.reportBody}>
        <h3 className={home.reportTitle}>{t(`labreports.items.${kind}.short` as const)}</h3>
        <dl className={home.reportFacts}>
          <div>
            <dt>{t('labreports.card.reportNo')}</dt>
            <dd>{t(`labreports.items.${kind}.reportNo` as const)}</dd>
          </div>
          <div>
            <dt>{t('labreports.card.issued')}</dt>
            <dd>{t(`labreports.items.${kind}.issued` as const)}</dd>
          </div>
        </dl>
      </div>
    </li>
  )
}

/**
 * Laboratory Test Reports on the home page: what the reports are (from the reports page's own words), the six product
 * reports in brief (pictures per reportPicture) opening the same viewer, and the reports' own caveat that
 * results relate only to the sample tested.
 */
export const HomeLabReports = () => {
  const { t } = useStorefront()
  const cards = reports.map((key) => ({ key, picture: reportPicture(key, t(`labreports.assets.${key}` as const)) }))
  const items: ReportViewerItem[] = cards.map(({ key, picture }) => ({
    ...picture,
    key,
    title: t(`labreports.items.${key}.product` as const),
    issued: t(`labreports.items.${key}.issued` as const),
  }))
  const [open, setOpen] = useState<number | null>(null)
  const returnTo = useRef<() => void>(undefined)
  const close = () => {
    setOpen(null)
    returnTo.current?.()
  }
  const facts = [
    { label: t('labreports.intro.labLabel'), value: t('labreports.intro.lab') },
    { label: t('labreports.intro.countLabel'), value: t('labreports.intro.count') },
    { label: t('labreports.intro.servingLabel'), value: t('labreports.intro.serving') },
    { label: t('labreports.intro.paramsLabel'), value: t('labreports.intro.params') },
  ]
  return (
    <section className={home.labsBand} aria-labelledby="home-labs-title">
      <div className={home.labsInner}>
        <div className={home.labsIntro}>
          <p className={styles.eyebrow}>{t('home.labs.eyebrow')}</p>
          <h2 id="home-labs-title" className={styles.title}>
            {t('labreports.gallery.title')}
          </h2>
          <p className={home.labsLead}>{t('labreports.intro.lead')}</p>
          <dl className={home.labsFacts}>
            {facts.map((f) => (
              <div key={f.label} className={home.labsFact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className={home.labsNote}>{t('labreports.intro.note')}</p>
          <Link href="/laboratory-test-reports/" className={home.labsButton}>
            {t('home.labs.all')}
            <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <ul className={home.reportGrid}>
          {cards.map((c, index) => (
            <Card
              key={c.key}
              kind={c.key}
              picture={c.picture}
              onView={(returnFocus) => {
                returnTo.current = returnFocus
                setOpen(index)
              }}
            />
          ))}
        </ul>
      </div>
      {open !== null ? <LaboratoryReportViewer key={open} items={items} index={open} onIndex={setOpen} onClose={close} /> : null}
    </section>
  )
}
