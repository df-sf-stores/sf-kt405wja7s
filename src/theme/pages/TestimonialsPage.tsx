import { useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { TestimonialsExplorer } from '../components/interactive/TestimonialsExplorer'
import { TestimonialsCTA, TestimonialsDisclaimer, TestimonialsHero } from '../components/testimonials/TestimonialsSections'
import styles from '../styles/testimonials.module.css'

/**
 * /testimonials/: customer testimonials from the client's English and Hindi documents, by product and language. Only
 * testimonials about taste and general experience are published; those claiming a medical result are held for sign-off.
 */
export const TestimonialsPage = () => {
  const { t } = useStorefront()
  useHead({ title: t('testimonials.seo.title'), description: t('testimonials.seo.description') })
  return (
    <Layout>
      <div className={styles.page}>
        <TestimonialsHero />
        <TestimonialsExplorer />
        <TestimonialsDisclaimer />
        <TestimonialsCTA />
      </div>
    </Layout>
  )
}
