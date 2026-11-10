import { useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { ContactForm } from '../components/interactive/ContactForm'
import styles from '../styles/contact.module.css'

/** A line icon for each way to reach the store. */
const Icon = ({ kind }: { kind: 'phone' | 'email' | 'web' }) => (
  <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === 'phone' ? <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5.5a2 2 0 012-2z" /> : null}
    {kind === 'email' ? (
      <>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </>
    ) : null}
    {kind === 'web' ? (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z" />
      </>
    ) : null}
  </svg>
)

/**
 * /contact/: a centred heading, then a short welcome with the store's own phone and email from Site settings beside the
 * four-field form. Phone and email are the store's settings, never written in the theme.
 */
export const ContactPage = () => {
  const { store, t } = useStorefront()
  useHead({ title: t('pages.contact.seoTitle'), description: t('pages.contact.seoDescription') })
  return (
    <Layout>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('pages.contact.title')}</h1>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.lead}>{t('pages.contact.lead')}</p>
        </header>
        <div className={styles.layout}>
          <aside className={styles.info} aria-labelledby="contact-info">
            <h2 id="contact-info" className={styles.infoTitle}>
              {t('pages.contact.infoTitle')}
            </h2>
            <p className={styles.infoLead}>{t('pages.contact.infoLead')}</p>
            <p className={styles.infoBrand}>{t('pages.contact.brand')}</p>
            <ul className={styles.infoList}>
              {store.contactPhone ? (
                <li className={styles.infoItem}>
                  <Icon kind="phone" />
                  <span className={styles.infoText}>
                    <span className={styles.infoLabel}>{t('pages.contact.phone')}</span>
                    <span className={styles.infoValue}>{store.contactPhone}</span>
                  </span>
                </li>
              ) : null}
              {store.contactEmail ? (
                <li className={styles.infoItem}>
                  <Icon kind="email" />
                  <span className={styles.infoText}>
                    <span className={styles.infoLabel}>{t('pages.contact.email')}</span>
                    <span className={styles.infoValue}>{store.contactEmail}</span>
                  </span>
                </li>
              ) : null}
              <li className={styles.infoItem}>
                <Icon kind="web" />
                <span className={styles.infoText}>
                  <span className={styles.infoLabel}>{t('pages.contact.website')}</span>
                  <span className={styles.infoValue}>{t('pages.contact.websiteValue')}</span>
                </span>
              </li>
            </ul>
          </aside>
          <section className={styles.formCard} aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className={styles.formTitle}>
              {t('pages.contact.form.title')}
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </Layout>
  )
}
