import { useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { LaboratoryReportsGallery } from '../components/interactive/LaboratoryReportsGallery'
import { LaboratoryReportsCTA, LaboratoryReportsHero, LaboratoryReportsIntro } from '../components/labreports/LaboratoryReportsSections'
import styles from '../styles/labreports.module.css'

/**
 * /laboratory-test-reports/: the six ETRL laboratory test reports the client supplied, one per product. Each report's
 * page is the original photograph from its PDF, uploaded to Storefront › Assets; its id goes in content/en/labreports.json.
 */
export const LaboratoryReportsPage = () => {
  const { t } = useStorefront()
  useHead({ title: t('labreports.seo.title'), description: t('labreports.seo.description') })
  return (
    <Layout>
      <div className={styles.page}>
        <LaboratoryReportsHero />
        <LaboratoryReportsIntro />
        <LaboratoryReportsGallery />
        <LaboratoryReportsCTA />
      </div>
    </Layout>
  )
}
