import { Link, useStorefront, type Photo } from '@dripfunnel/storefront-core/theme'
import { AboutPicture, SectionHead, Sprig } from './AboutArt'
import styles from '../../styles/aboutpage.module.css'

/** Section 1: the page's one h1, two ways on, and the hero picture with the founding year. */
export const AboutHero = ({ picture }: { picture: Photo | null }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.hero} aria-labelledby="about-title">
      <Sprig className={styles.heroSprig} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={`${styles.heroEyebrow} ${styles.enter}`}>{t('about.hero.eyebrow')}</p>
          <h1 id="about-title" className={`${styles.heroTitle} ${styles.enter} ${styles.delay1}`}>
            {t('about.hero.title')}
          </h1>
          <p className={`${styles.heroLead} ${styles.enter} ${styles.delay2}`}>{t('about.hero.lead')}</p>
          <div className={`${styles.heroActions} ${styles.enter} ${styles.delay3}`}>
            <Link href="#our-story" className={styles.buttonGold}>
              {t('about.hero.story')}
            </Link>
            <Link href="#our-infusions" className={styles.buttonGhost}>
              {t('about.hero.teas')}
            </Link>
          </div>
        </div>
        <div className={`${styles.heroPicture} ${styles.enterSoft}`}>
          <div className={styles.heroArch}>
            <AboutPicture slot="hero" fallback={picture} className={styles.cover} />
          </div>
          <p className={styles.heroSeal}>{t('about.hero.founded')}</p>
        </div>
      </div>
    </section>
  )
}

/** Section 2: the company's vision, beside a picture, with three facts from the client's documents. */
export const CompanyIntroduction = ({ picture }: { picture: Photo | null }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.section} aria-labelledby="about-company">
      <div className={`${styles.split} ${styles.reveal}`}>
        <div className={styles.framed}>
          <AboutPicture slot="company" fallback={picture} className={styles.cover} />
        </div>
        <div className={styles.copy}>
          <SectionHead eyebrow={t('about.company.eyebrow')} title={t('about.company.title')} id="about-company" />
          <p className={styles.lead}>{t('about.company.first')}</p>
          <p className={styles.body}>{t('about.company.second')}</p>
          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>{t('about.company.factYearLabel')}</dt>
              <dd>{t('about.company.factYear')}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{t('about.company.factCountLabel')}</dt>
              <dd>{t('about.company.factCount')}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{t('about.company.factFreeLabel')}</dt>
              <dd>{t('about.company.factFree')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

type Milestone = 'practice' | 'journey' | 'founded' | 'today'
const milestones: readonly Milestone[] = ['practice', 'journey', 'founded', 'today']

/** Section 3: how the brand began, and its milestones on a timeline with 2011 marked in gold. */
export const BrandStory = () => {
  const { t } = useStorefront()
  return (
    <section id="our-story" className={styles.sectionTint} aria-labelledby="about-story">
      <div className={styles.narrow}>
        <SectionHead eyebrow={t('about.story.eyebrow')} title={t('about.story.title')} id="about-story" center />
        <div className={`${styles.storyText} ${styles.reveal}`}>
          <p className={styles.lead}>{t('about.story.first')}</p>
          <p className={styles.body}>{t('about.story.second')}</p>
          <p className={styles.body}>{t('about.story.third')}</p>
        </div>
      </div>
      <ol className={styles.timeline} aria-label={t('about.story.timeline.label')}>
        {milestones.map((m) => (
          <li key={m} className={`${m === 'founded' ? styles.milestoneKey : styles.milestone} ${styles.reveal}`}>
            <span className={styles.milestoneDot} aria-hidden="true" />
            <p className={styles.milestoneYear}>{t(`about.story.timeline.${m}Year` as const)}</p>
            <h3 className={styles.milestoneTitle}>{t(`about.story.timeline.${m}Title` as const)}</h3>
            <p className={styles.milestoneBody}>{t(`about.story.timeline.${m}Body` as const)}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

type Credential = 'degree' | 'college' | 'practice' | 'home' | 'iskcon'
const credentials: readonly Credential[] = ['degree', 'college', 'practice', 'home', 'iskcon']

/** Section 4: the founder's portrait (his own photograph only, once uploaded), biography and credentials. */
export const FounderProfile = () => {
  const { t } = useStorefront()
  return (
    <section id="founder" className={styles.founder} aria-labelledby="about-founder">
      <div className={styles.founderInner}>
        <div className={`${styles.founderPortrait} ${styles.reveal}`}>
          <div className={styles.portraitFrame}>
            <AboutPicture slot="founder" className={styles.cover} />
            <span className={styles.monogram} aria-hidden="true">
              {t('about.founder.monogram')}
            </span>
          </div>
          <div className={styles.founderCard}>
            <p className={styles.founderName}>{t('about.founder.name')}</p>
            <p className={styles.founderMeta}>{t('about.founder.qualifications')}</p>
            <p className={styles.founderMeta}>{t('about.founder.college')}</p>
          </div>
        </div>
        <div className={styles.founderCopy}>
          <SectionHead eyebrow={t('about.founder.eyebrow')} title={t('about.founder.title')} id="about-founder" light />
          <p className={styles.leadLight}>{t('about.founder.first')}</p>
          <p className={styles.bodyLight}>{t('about.founder.second')}</p>
          <p className={styles.bodyLight}>{t('about.founder.third')}</p>
          <p className={styles.bodyLight}>{t('about.founder.fourth')}</p>
          <div className={styles.credentials}>
            <h3 className={styles.credentialsTitle}>{t('about.founder.credentials.title')}</h3>
            <ul className={styles.credentialList}>
              {credentials.map((c) => (
                <li key={c} className={styles.credential}>
                  <svg className={styles.credentialIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7z" />
                  </svg>
                  <span>
                    <strong>{t(`about.founder.credentials.${c}Title` as const)}</strong>
                    <span>{t(`about.founder.credentials.${c}Body` as const)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
