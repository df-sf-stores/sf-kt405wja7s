'use client'

import { useRef, useState } from 'react'
import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { CertificateIcon } from '../CertificateIcon'
import { cx } from '../cx'
import { certificates, iconOf, type CertificateKey } from '../certificates'
import { certificatePicture, Picture, type ViewerPicture } from '../themeMedia'
import { CertificateImageViewer, type ViewerItem } from './CertificateImageViewer'
import styles from '../../styles/landing.module.css'
import home from '../../styles/homesections.module.css'

/** One certificate in brief: its picture, whole on a light mat (which opens the viewer), its kind, name and description. */
const Card = ({ kind, picture, onView }: { kind: CertificateKey; picture: ViewerPicture; onView: (returnFocus: () => void) => void }) => {
  const { t } = useStorefront()
  const button = useRef<HTMLButtonElement>(null)
  const title = t(`certificates.items.${kind}.title` as const)
  return (
    <li className={cx(home.certificate, styles.reveal)}>
      <div className={home.certificateMat}>
        <button ref={button} type="button" className={home.certificateButton} onClick={() => onView(() => button.current?.focus())} aria-label={t('home.certificates.view', { title })}>
          <Picture picture={picture} alt={t('certificates.card.previewAlt', { title })} uploadRatio={0.75} sizes="(min-width: 1280px) 220px, (min-width: 900px) 30vw, (min-width: 700px) 45vw, 50vw" className={home.certificateImage} />
        </button>
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
 * Certificates & Registrations on the home page: the six certificates the /certificates/ page shows, in brief, each with
 * its picture (see certificatePicture), opening the same viewer.
 */
export const HomeCertificates = () => {
  const { t } = useStorefront()
  const cards = certificates.map((key) => ({ key, picture: certificatePicture(key, t(`certificates.assets.${key}` as const)) }))
  const items: ViewerItem[] = cards.map((c) => ({ ...c.picture, title: t(`certificates.items.${c.key}.title` as const) }))
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
      <div className={styles.center}>
        <Link href="/certificates/" className={styles.button}>
          {t('home.certificates.all')}
          <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      {open !== null ? <CertificateImageViewer items={items} index={open} onIndex={setOpen} onClose={close} /> : null}
    </section>
  )
}
