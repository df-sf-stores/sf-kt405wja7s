'use client'

import { useRef } from 'react'
import { Link, MerchantImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { CertificateIcon } from '../CertificateIcon'
import { fileOf, iconOf, type CertificateKey } from '../certificates'
import styles from '../../styles/certificates.module.css'

/** "Label: value" lines from the words file, as a list of terms and their values. */
const rowsOf = (details: string) =>
  details
    .split('\n')
    .map((line) => {
      const at = line.indexOf(':')
      return at > 0 ? { term: line.slice(0, at).trim(), value: line.slice(at + 1).trim() } : null
    })
    .filter((row) => row !== null)

/**
 * One certificate: its picture whole on an ivory mat, its category, title, issuer, description and details, and the
 * ways to view it large and to open the original file. `asset` is null until the picture's id is in the words file.
 */
export const CertificateCard = ({ kind, asset, onView }: { kind: CertificateKey; asset: string | null; onView: (returnFocus: () => void) => void }) => {
  const { t } = useStorefront()
  const view = useRef<HTMLButtonElement>(null)
  const title = t(`certificates.items.${kind}.title` as const)
  const open = () => onView(() => view.current?.focus())
  return (
    <article className={styles.card}>
      <div className={styles.mat}>
        {asset ? (
          <button type="button" className={styles.matButton} onClick={open} aria-label={t('certificates.card.view')}>
            <MerchantImage asset={asset} alt={t('certificates.card.previewAlt', { title })} ratio={0.75} sizes="(min-width: 1200px) 400px, (min-width: 640px) 46vw, 92vw" className={styles.matImage} />
            <span className={styles.matZoom} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5M11 8v6M8 11h6" />
              </svg>
            </span>
          </button>
        ) : (
          <div className={styles.matEmpty}>
            <CertificateIcon kind={iconOf(kind)} className={styles.matEmptyIcon} />
            <p>{t('certificates.gallery.pending')}</p>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.category}>
          <CertificateIcon kind={iconOf(kind)} className={styles.categoryIcon} />
          <span>{t(`certificates.items.${kind}.category` as const)}</span>
        </p>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.issuer}>
          <span className={styles.issuerLabel}>{t('certificates.card.issuer')}</span> {t(`certificates.items.${kind}.issuer` as const)}
        </p>
        <p className={styles.description}>{t(`certificates.items.${kind}.description` as const)}</p>
        <dl className={styles.details} aria-label={t('certificates.card.details')}>
          {rowsOf(t(`certificates.items.${kind}.details` as const)).map((row) => (
            <div key={row.term} className={styles.detailRow}>
              <dt>{row.term}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        {asset ? (
          <div className={styles.actions}>
            <button ref={view} type="button" className={styles.primary} onClick={open}>
              {t('certificates.card.view')}
            </button>
            <Link href={fileOf(asset)} className={styles.secondary}>
              {t('certificates.card.download')}
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  )
}
