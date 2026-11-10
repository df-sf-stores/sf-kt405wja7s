'use client'

import { useRef, useState } from 'react'
import { useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { uploaded } from '../assets'
import { certificates } from '../certificates'
import { CertificateCard } from './CertificateCard'
import { CertificateImageViewer, type ViewerItem } from './CertificateImageViewer'
import styles from '../../styles/certificates.module.css'

/** The six certificate cards and the viewer they open, which steps through every certificate whose picture is in. */
export const CertificateGallery = () => {
  const { t } = useStorefront()
  useHead({ title: t('certificates.seo.title'), description: t('certificates.seo.description') })
  const cards = certificates.map((key) => ({ key, asset: uploaded(t(`certificates.assets.${key}` as const)), title: t(`certificates.items.${key}.title` as const) }))
  const items: ViewerItem[] = cards.flatMap((c) => (c.asset ? [{ asset: c.asset, title: c.title }] : []))
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
        {cards.map((c) => (
          <CertificateCard
            key={c.key}
            kind={c.key}
            asset={c.asset}
            onView={(returnFocus) => {
              returnTo.current = returnFocus
              setOpen(items.findIndex((i) => i.asset === c.asset))
            }}
          />
        ))}
      </div>
      {open !== null && open >= 0 ? <CertificateImageViewer items={items} index={open} onIndex={setOpen} onClose={close} /> : null}
    </section>
  )
}
