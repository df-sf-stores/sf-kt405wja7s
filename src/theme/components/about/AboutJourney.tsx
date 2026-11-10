import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { AboutPicture, SectionHead, Sprig } from './AboutArt'
import styles from '../../styles/aboutpage.module.css'

type Moment = 'morning' | 'noon' | 'evening'
const moments: readonly Moment[] = ['morning', 'noon', 'evening']

/** Section 5: the founder's own tea-brewing story, told personally, with his words on loose-leaf tea. */
export const TeaBrewingStory = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="about-brewing">
      <div className={`${styles.split} ${styles.splitReverse} ${styles.reveal}`}>
        <div className={styles.copy}>
          <SectionHead eyebrow={t('about.brewing.eyebrow')} title={t('about.brewing.title')} id="about-brewing" />
          <p className={styles.lead}>{t('about.brewing.first')}</p>
          <p className={styles.body}>{t('about.brewing.second')}</p>
          <ol className={styles.day} aria-label={t('about.brewing.day.label')}>
            {moments.map((m) => (
              <li key={m} className={styles.dayItem}>
                <span className={styles.dayTime}>{t(`about.brewing.day.${m}` as const)}</span>
                <span className={styles.dayTea}>{t(`about.brewing.day.${m}Body` as const)}</span>
              </li>
            ))}
          </ol>
          <p className={styles.body}>{t('about.brewing.third')}</p>
          <p className={styles.body}>{t('about.brewing.fourth')}</p>
        </div>
        <figure className={styles.quoteFigure}>
          <div className={styles.framedSoft}>
            <AboutPicture slot="brewing" className={styles.cover} />
          </div>
          <blockquote className={styles.quote}>
            <p>{t('about.brewing.quote')}</p>
          </blockquote>
          <figcaption className={styles.quoteBy}>{t('about.brewing.quoteBy')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

/** Section 6: the spiritual journey from 1985, kept calm and respectful. */
export const SpiritualJourney = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.journey} aria-labelledby="about-journey">
      <Sprig className={styles.journeySprig} />
      <div className={`${styles.split} ${styles.reveal}`}>
        <div className={styles.framedRound}>
          <AboutPicture slot="journey" className={styles.cover} />
        </div>
        <div className={styles.copy}>
          <SectionHead eyebrow={t('about.journey.eyebrow')} title={t('about.journey.title')} id="about-journey" />
          <p className={styles.lead}>{t('about.journey.first')}</p>
          <p className={styles.pillar}>{t('about.journey.pillar')}</p>
          <p className={styles.body}>{t('about.journey.second')}</p>
          <p className={styles.body}>{t('about.journey.third')}</p>
        </div>
      </div>
    </section>
  )
}

type Ours = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth'
const ours: readonly Ours[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
type Theirs = 'first' | 'second'
const theirs: readonly Theirs[] = ['first', 'second']

/** Section 7: why herbal tea, and how the infusions differ from conventional tea, only as the client's documents describe. */
export const HerbalTeaPhilosophy = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.sectionTint} aria-labelledby="about-why">
      <div className={styles.narrow}>
        <SectionHead eyebrow={t('about.why.eyebrow')} title={t('about.why.title')} id="about-why" center />
        <div className={`${styles.storyText} ${styles.reveal}`}>
          <p className={styles.lead}>{t('about.why.first')}</p>
          <p className={styles.body}>{t('about.why.second')}</p>
          <p className={styles.body}>{t('about.why.third')}</p>
        </div>
      </div>
      <div className={`${styles.compare} ${styles.reveal}`}>
        <div className={styles.compareTheirs}>
          <h3 className={styles.compareTitle}>{t('about.why.conventional.title')}</h3>
          <ul className={styles.compareList}>
            {theirs.map((k) => (
              <li key={k}>
                <span className={styles.compareDot} aria-hidden="true" />
                {t(`about.why.conventional.${k}` as const)}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.compareOurs}>
          <h3 className={styles.compareTitleLight}>{t('about.why.ours.title')}</h3>
          <ul className={styles.compareList}>
            {ours.map((k) => (
              <li key={k}>
                <svg className={styles.compareTick} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {t(`about.why.ours.${k}` as const)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.note}>{t('about.why.note')}</p>
    </section>
  )
}

type Step = 'idea' | 'learn' | 'guide'
const steps: readonly Step[] = ['idea', 'learn', 'guide']

/** Section 8: why the founder built his herbal tea guide, with the original website named (as words, not a link). */
export const WebsiteJourney = () => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="about-website">
      <div className={`${styles.split} ${styles.splitReverse} ${styles.reveal}`}>
        <div className={styles.copy}>
          <SectionHead eyebrow={t('about.website.eyebrow')} title={t('about.website.title')} id="about-website" />
          <p className={styles.lead}>{t('about.website.first')}</p>
          <p className={styles.body}>{t('about.website.second')}</p>
          <p className={styles.body}>{t('about.website.third')}</p>
          <p className={styles.body}>{t('about.website.fourth')}</p>
          <p className={styles.body}>{t('about.website.fifth')}</p>
        </div>
        <div className={styles.websiteSide}>
          <div className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.browserScreen}>
              <AboutPicture slot="website" className={styles.cover} />
            </div>
            <p className={styles.browserCaption}>
              <span className={styles.browserLabel}>{t('about.website.siteLabel')}</span>
              <strong className={styles.browserSite}>{t('about.website.site')}</strong>
            </p>
          </div>
          <ol className={styles.steps} aria-label={t('about.website.steps.label')}>
            {steps.map((s) => (
              <li key={s} className={styles.step}>
                <h3 className={styles.stepTitle}>{t(`about.website.steps.${s}Title` as const)}</h3>
                <p className={styles.stepBody}>{t(`about.website.steps.${s}Body` as const)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
