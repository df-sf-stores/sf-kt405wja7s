'use client'

import { useRef, useState } from 'react'
import { useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { certificates } from '../certificates'
import { certificatePicture } from '../themeMedia'
import { CertificateCard } from './CertificateCard'
import { CertificateImageViewer, type ViewerItem } from './CertificateImageViewer'
import styles from '../../styles/certificates.module.css'

/** The six certificate cards and the viewer they open, which steps through all six. */
export const CertificateGallery = () => {
  const { t } = useStorefront()
  useHead({ title: t('certificates.seo.title'), description: t('certificates.seo.description') })
  const cards = certificates.map((key) => ({ key, picture: certificatePicture(key, t(`certificates.assets.${key}` as const)) }))
  const items: ViewerItem[] = cards.map((c) => ({ ...c.picture, title: t(`certificates.items.${c.key}.title` as const) }))
  const [open, setOpen] = useState<number | null>(null)
  const returnTo = useRef<() => void>(undefined)
  const close = () => {
    setOpen(null)
    returnTo.current?.()
  }
  return (
    <section className={styles.gallery} aria-labelledby="certificates-gallery">
      <div className={styles.galleryHead}>
        <h2 id="certificates-gallery" className={styles.galleryTitle}>
          {t('certificates.gallery.title')}
        </h2>
        <span className={styles.galleryRule} aria-hidden="true" />
        <p className={styles.galleryLead}>{t('certificates.gallery.lead')}</p>
      </div>
      <div className={styles.grid}>
        {cards.map((c, index) => (
          <CertificateCard
            key={c.key}
            kind={c.key}
            picture={c.picture}
            onView={(returnFocus) => {
              returnTo.current = returnFocus
              setOpen(index)
            }}
          />
        ))}
      </div>
      {open !== null ? <CertificateImageViewer items={items} index={open} onIndex={setOpen} onClose={close} /> : null}
    </section>
  )
}
