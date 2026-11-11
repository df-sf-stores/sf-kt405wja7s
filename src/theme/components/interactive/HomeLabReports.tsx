'use client'

import { useRef, useState } from 'react'
import { Link, MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import { cx } from '../cx'
import { reports, type ReportKey } from '../labReports'
import { LaboratoryReportViewer, type ReportViewerItem } from './LaboratoryReportViewer'
import styles from '../../styles/landing.module.css'
import home from '../../styles/homesections.module.css'

/** A conical flask drawn in a fine line, for a report whose image is still to come. */
const Flask = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M18 6h12M20 6v12L10 38a3 3 0 002.7 4h22.6a3 3 0 002.7-4L28 18V6" />
    <path d="M14.5 30h19" />
  </svg>
)

/** One product's report in brief: its page (which opens the viewer) or "coming soon", the product, report number and date. */
const Card = ({ kind, asset, onView }: { kind: ReportKey; asset: string | null; onView: (returnFocus: () => void) => void }) => {
  const { t } = useStorefront()
  const button = useRef<HTMLButtonElement>(null)
  return (
    <li className={cx(home.report, styles.reveal)}>
      <div className={home.reportMat}>
        {asset ? (
          <button ref={button} type="button" className={home.reportButton} onClick={() => onView(() => button.current?.focus())} aria-label={t(`labreports.items.${kind}.viewLabel` as const)}>
            <MerchantImage asset={asset} alt={t(`labreports.items.${kind}.alt` as const)} ratio={0.7} sizes="(min-width: 1080px) 180px, (min-width: 700px) 30vw, 45vw" className={home.reportImage} />
          </button>
        ) : (
          <div className={home.reportEmpty}>
            <Flask className={home.reportEmptyIcon} />
            <span>{t('labreports.gallery.pending')}</span>
          </div>
        )}
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
 * reports in brief opening the same viewer, and the reports' own caveat that results relate only to the sample tested.
 */
export const HomeLabReports = () => {
  const { t } = useStorefront()
  const cards = reports.map((key) => ({ key, asset: uploaded(t(`labreports.assets.${key}` as const)) }))
  const items: ReportViewerItem[] = cards.flatMap((c) =>
    c.asset ? [{ key: c.key, asset: c.asset, title: t(`labreports.items.${c.key}.product` as const), issued: t(`labreports.items.${c.key}.issued` as const) }] : [],
  )
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
          {cards.map((c) => (
            <Card
              key={c.key}
              kind={c.key}
              asset={c.asset}
              onView={(returnFocus) => {
                returnTo.current = returnFocus
                setOpen(items.findIndex((i) => i.key === c.key))
              }}
            />
          ))}
        </ul>
      </div>
      {open !== null && open >= 0 ? <LaboratoryReportViewer key={open} items={items} index={open} onIndex={setOpen} onClose={close} /> : null}
    </section>
  )
}
