import { Layout } from '../components/Layout'
import { CertificatesCTA, CertificatesHero, TrustIndicators } from '../components/certificates/CertificatesSections'
import { CertificateGallery } from '../components/interactive/CertificateGallery'
import styles from '../styles/certificates.module.css'

/** /certificates/: the store's registrations, trademark and recognition, each approved certificate to view and keep. */
export const CertificatesPage = () => (
  <Layout>
    <div className={styles.page}>
      <CertificatesHero />
      <TrustIndicators />
      <CertificateGallery />
      <CertificatesCTA />
    </div>
  </Layout>
)
