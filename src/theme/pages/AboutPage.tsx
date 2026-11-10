import { useCollections, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { AboutPicture } from '../components/about/AboutArt'
import { AboutClosingBanner, BrandValues, FounderContact, HerbalInfusionCollection } from '../components/about/AboutCollection'
import { HerbalTeaPhilosophy, SpiritualJourney, TeaBrewingStory, WebsiteJourney } from '../components/about/AboutJourney'
import { AboutHero, BrandStory, CompanyIntroduction, FounderProfile } from '../components/about/AboutStory'
import styles from '../styles/aboutpage.module.css'

/**
 * /about/: the brand's story from the client's three documents (company, founder and his own account), in twelve sections.
 * Pictures are the merchant's Storefront › Assets files once their ids are in content/en/about.json; until then the
 * store's collection photographs and botanical drawings stand in, and the founder's place never shows anyone else.
 */
export const AboutPage = () => {
  const { t } = useStorefront()
  useHead({ title: t('about.seo.title'), description: t('about.seo.description') })
  const { collections } = useCollections({ first: 20 })
  const pictures = collections.map((c) => c.image).filter((image) => image !== null)
  return (
    <Layout>
      <div className={styles.page}>
        <AboutHero picture={pictures[0] ?? null} />
        <CompanyIntroduction picture={pictures[1] ?? null} />
        <BrandStory />
        <FounderProfile />
        <TeaBrewingStory />
        <SpiritualJourney />
        <HerbalTeaPhilosophy />
        <WebsiteJourney />
        <HerbalInfusionCollection />
        <BrandValues />
        <AboutClosingBanner>
          <AboutPicture slot="closing" fallback={pictures[2] ?? null} className={styles.cover} />
        </AboutClosingBanner>
        <FounderContact />
      </div>
    </Layout>
  )
}
