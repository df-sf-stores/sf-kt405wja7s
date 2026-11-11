'use client'

import { useRef, useState } from 'react'
import { Link, MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import { CertificateIcon } from '../CertificateIcon'
import { cx } from '../cx'
import { certificates, iconOf, type CertificateKey } from '../certificates'
import { CertificateImageViewer, type ViewerItem } from './CertificateImageViewer'
import styles from '../../styles/landing.module.css'
import home from '../../styles/homesections.module.css'

/** One certificate in brief: its picture (which opens the viewer) or the page's "coming soon", its kind, name and description. */
const Card = ({ kind, asset, onView }: { kind: CertificateKey; asset: string | null; onView: (returnFocus: () => void) => void }) => {
  const { t } = useStorefront()
  const button = useRef<HTMLButtonElement>(null)
  const title = t(`certificates.items.${kind}.title` as const)
  return (
    <li className={cx(home.certificate, styles.reveal)}>
      <div className={home.certificateMat}>
        {asset ? (
          <button ref={button} type="button" className={home.certificateButton} onClick={() => onView(() => button.current?.focus())} aria-label={t('home.certificates.view', { title })}>
            <MerchantImage asset={asset} alt={t('certificates.card.previewAlt', { title })} ratio={0.75} sizes="(min-width: 1080px) 200px, (min-width: 700px) 30vw, 45vw" className={home.certificateImage} />
          </button>
        ) : (
          <div className={home.certificateEmpty}>
            <CertificateIcon kind={iconOf(kind)} className={home.certificateEmptyIcon} />
            <span>{t('certificates.gallery.pending')}</span>
          </div>
        )}
      </div>
      <div className={home.certificateBody}>
        <p className={home.certificateKind}>
          <CertificateIcon kind={iconOf(kind)} className={home.certificateKindIcon} />
          {t(`certificates.items.${kind}.category` as const)}
        </p>
        <h3 className={home.certificateTitle}>{title}</h3>
        <p className={home.certificateText}>{t(`certificates.items.${kind}.description` as const)}</p>
      </div>
    </li>
  )
}

/**
 * Certificates & Registrations on the home page: the six certificates the /certificates/ page shows, in brief, opening
 * the same viewer; a certificate whose picture id is still "pending" says so rather than showing an empty frame.
 */
export const HomeCertificates = () => {
  const { t } = useStorefront()
  const cards = certificates.map((key) => ({ key, asset: uploaded(t(`certificates.assets.${key}` as const)), title: t(`certificates.items.${key}.title` as const) }))
  const items: ViewerItem[] = cards.flatMap((c) => (c.asset ? [{ asset: c.asset, title: c.title }] : []))
  const [open, setOpen] = useState<number | null>(null)
  const returnTo = useRef<() => void>(undefined)
  const close = () => {
    setOpen(null)
    returnTo.current?.()
  }
  return (
    <section className={cx(styles.section, home.certificatesBand)} aria-labelledby="home-certificates-title">
      <div className={styles.head}>
        <p className={styles.eyebrow}>{t('home.certificates.eyebrow')}</p>
        <h2 id="home-certificates-title" className={styles.title}>
          {t('certificates.hero.title')}
        </h2>
        <p className={styles.lead}>{t('certificates.gallery.lead')}</p>
      </div>
      <ul className={home.certificateGrid}>
        {cards.map((c) => (
          <Card
            key={c.key}
            kind={c.key}
            asset={c.asset}
            onView={(returnFocus) => {
              returnTo.current = returnFocus
              setOpen(items.findIndex((i) => i.asset === c.asset))
            }}
          />
        ))}
      </ul>
      <div className={styles.center}>
        <Link href="/certificates/" className={styles.button}>
          {t('home.certificates.all')}
          <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      {open !== null && open >= 0 ? <CertificateImageViewer items={items} index={open} onIndex={setOpen} onClose={close} /> : null}
    </section>
  )
}
