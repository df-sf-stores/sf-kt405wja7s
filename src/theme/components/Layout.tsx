import type { ReactNode } from 'react'
import { ConsentBanner, Link, PoweredBy, PreviewBanner, useStorefront } from '@dripfunnel/storefront-core/theme'
import { BrandLockup } from './BrandLockup'
import { DripFunnelCredit } from './DripFunnelCredit'
import { CertificatesFooterLink } from './interactive/CertificatesFooterLink'
import { LabReportsFooterLink } from './interactive/LabReportsFooterLink'
import { RecipesFooterLink } from './interactive/RecipesFooterLink'
import { TestimonialsFooterLink } from './interactive/TestimonialsFooterLink'
import { SiteHeader } from './interactive/SiteHeader'
import layout from '../styles/layout.module.css'
import styles from '../styles/site.module.css'

/** Each social network's glyph, by the name Site settings gives it; one without a glyph shows its name. */
const SocialGlyph = ({ network }: { network: string }) => {
  switch (network) {
    case 'instagram':
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="17" cy="7" r="0.6" />
        </>
      )
    case 'facebook':
      return <path d="M14 8.5h2.5V5H14a3.5 3.5 0 00-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 01.5-.5z" />
    case 'youtube':
      return (
        <>
          <rect x="3" y="6" width="18" height="12" rx="3.5" />
          <path d="M10.5 9.5v5l4.5-2.5z" />
        </>
      )
    case 'x':
      return <path d="M5 4l14 16M19 4L5 20" />
    case 'whatsapp':
      return <path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1012 3.5zM9 8.5c.3 2.8 3.2 5.9 6.5 6.5l1-1.5-2-1-1 .8c-1-.5-2-1.5-2.4-2.4l.8-1-1-2z" />
    default:
      return <circle cx="12" cy="12" r="8" />
  }
}

export const Layout = ({ children }: { children: ReactNode }) => {
  const { store, t, mode, poweredBy } = useStorefront()
  const whatsapp = store.social.find((s) => s.network === 'whatsapp')
  const address = store.address ? [store.address.street, store.address.city, store.address.region, store.address.postal].filter(Boolean).join(', ') : ''
  return (
    <div className={layout.shell}>
      {mode === 'live' ? null : <PreviewBanner t={t} className={layout.preview} />}
      <Link href="#main" className={styles.skip}>
        {t('common.skip')}
      </Link>
      <p className={styles.announce}>{t('common.announcement', { store: store.name })}</p>
      <SiteHeader />
      <main id="main" className={layout.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <BrandLockup place="footer" />
            </Link>
            <p className={styles.footerNote}>{store.description || t('common.footer.note')}</p>
            {store.social.length ? (
              <ul className={styles.social}>
                {store.social.map((s) => (
                  <li key={s.network}>
                    <Link href={s.url} className={styles.socialLink}>
                      <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <SocialGlyph network={s.network} />
                      </svg>
                      <span className={styles.hidden}>{t('common.footer.follow', { network: s.network })}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <nav className={styles.footerCol} aria-label={t('common.footer.quick')}>
            <h2 className={styles.footerHeading}>{t('common.footer.quick')}</h2>
            <Link href="/" className={styles.footerLink}>
              {t('common.nav.home')}
            </Link>
            <Link href="/collections/all/" className={styles.footerLink}>
              {t('common.footer.all')}
            </Link>
            <Link href="/about/" className={styles.footerLink}>
              {t('common.footer.story')}
            </Link>
            <Link href="/#collections" className={styles.footerLink}>
              {t('common.footer.collections')}
            </Link>
            <CertificatesFooterLink className={styles.footerLink} currentClassName={styles.footerCurrent}>
              {t('common.footer.certificates')}
            </CertificatesFooterLink>
            <RecipesFooterLink className={styles.footerLink} currentClassName={styles.footerCurrent}>
              {t('common.footer.recipes')}
            </RecipesFooterLink>
            <LabReportsFooterLink className={styles.footerLink} currentClassName={styles.footerCurrent}>
              {t('common.footer.labReports')}
            </LabReportsFooterLink>
            <TestimonialsFooterLink className={styles.footerLink} currentClassName={styles.footerCurrent}>
              {t('common.footer.testimonials')}
            </TestimonialsFooterLink>
            <Link href="/contact/" className={styles.footerLink}>
              {t('common.nav.contact')}
            </Link>
          </nav>
          <nav className={styles.footerCol} aria-label={t('common.footer.support')}>
            <h2 className={styles.footerHeading}>{t('common.footer.support')}</h2>
            <Link href="/policies/shipping/" className={styles.footerLink}>
              {t('common.footer.shipping')}
            </Link>
            <Link href="/policies/returns/" className={styles.footerLink}>
              {t('common.footer.returns')}
            </Link>
            <Link href="/policies/privacy/" className={styles.footerLink}>
              {t('common.footer.privacy')}
            </Link>
            <Link href="/policies/terms/" className={styles.footerLink}>
              {t('common.footer.terms')}
            </Link>
            <Link href="/help/" className={styles.footerLink}>
              {t('common.footer.faq')}
            </Link>
          </nav>
          <div className={styles.footerCol}>
            <h2 className={styles.footerHeading}>{t('common.footer.touch')}</h2>
            <div className={styles.contact}>
              <span className={styles.contactName}>{t('common.footer.founder')}</span>
              <span>{t('common.footer.clinic')}</span>
              {address ? <span>{address}</span> : null}
              {store.contactPhone ? <span>{t('common.footer.phone', { phone: store.contactPhone })}</span> : null}
              {store.contactEmail ? <span>{t('common.footer.email', { email: store.contactEmail })}</span> : null}
              <span>{t('common.footer.website')}</span>
            </div>
          </div>
        </div>
        <div className={styles.footerBase}>
          <p className={styles.copyright}>{t('common.footer.rights', { store: store.name })}</p>
          <DripFunnelCredit />
          <PoweredBy brand={poweredBy} t={t} className={styles.powered} />
        </div>
      </footer>
      {whatsapp ? (
        <Link href={whatsapp.url} className={layout.whatsapp}>
          <svg className={layout.whatsappIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm4.4 12.4c-.2.5-1.1 1-1.6 1-.4.1-.9.1-1.5-.1a13 13 0 01-1.4-.5 10.6 10.6 0 01-4-3.6 4.6 4.6 0 01-1-2.4c0-1.2.6-1.7.8-2 .2-.2.5-.3.6-.3h.5c.1 0 .4 0 .6.4l.8 1.9c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3z" />
          </svg>
          <span className={styles.hidden}>{t('common.footer.whatsapp')}</span>
        </Link>
      ) : null}
      <ConsentBanner t={t} className={layout.consent} />
    </div>
  )
}
