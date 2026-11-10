'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, navigate, SearchField, useCart, useCollections, useLocation, useStorefront, useWishlist } from '@dripfunnel/storefront-core/theme'
import { BrandLockup } from '../BrandLockup'
import styles from '../../styles/site.module.css'

// The theme rules allow no URL encoding, so the characters that would break the query are dropped instead.
const searchFor = (words: string) => navigate(`/search/?q=${words.replace(/[&+%#]/g, ' ').trim()}`)

const Icon = ({ children }: { children: ReactNode }) => (
  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

/** The sticky header: brand, the main links with the collections under "Our Collections", search, account, wishlist and cart. */
export const SiteHeader = () => {
  const { t } = useStorefront()
  const { path } = useLocation()
  const { collections: fetched, status } = useCollections({ first: 20 })
  const collections = status === 'ready' ? fetched : []
  const { count } = useCart()
  const { count: wished } = useWishlist()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(false)
  const menuToggle = useRef<HTMLButtonElement>(null)
  const searchToggle = useRef<HTMLButtonElement>(null)
  const leaving = useRef<ReturnType<typeof setTimeout>>(undefined)

  const here = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))
  const linkClass = (href: string) => (here(href) ? `${styles.navLink} ${styles.navActive}` : styles.navLink)
  const inCollections = path.startsWith('/collections/') && path !== '/collections/all/'

  const escape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return
    if (searchOpen) {
      setSearchOpen(false)
      searchToggle.current?.focus()
    } else if (menuOpen) {
      setMenuOpen(false)
      menuToggle.current?.focus()
    } else if (subOpen) setSubOpen(false)
  }

  return (
    <header className={styles.header} onKeyDown={escape}>
      <div className={styles.bar}>
        <button ref={menuToggle} type="button" className={styles.menuToggle} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon>
            <path d={menuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h10'} />
          </Icon>
          <span className={styles.hidden}>{menuOpen ? t('common.nav.close') : t('common.nav.menu')}</span>
        </button>
        <Link href="/" className={styles.brand}>
          <BrandLockup place="header" />
        </Link>
        <nav id="site-nav" className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav} aria-label={t('common.nav.label')}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={linkClass('/')}>
                {t('common.nav.home')}
              </Link>
            </li>
            <li>
              <Link href="/collections/all/" className={linkClass('/collections/all/')}>
                {t('common.nav.shopAll')}
              </Link>
            </li>
            <li
              className={styles.navGroup}
              onFocus={() => clearTimeout(leaving.current)}
              onBlur={() => {
                leaving.current = setTimeout(() => setSubOpen(false), 0)
              }}
            >
              <span className={styles.navGroupHead}>
                <Link href="/#collections" className={inCollections ? `${styles.navLink} ${styles.navActive}` : styles.navLink}>
                  {t('common.nav.collections')}
                </Link>
                <button type="button" className={styles.subToggle} aria-expanded={subOpen} aria-label={t('common.nav.submenu', { item: t('common.nav.collections') })} onClick={() => setSubOpen(!subOpen)}>
                  <Icon>
                    <path d="M6 9l6 6 6-6" />
                  </Icon>
                </button>
              </span>
              <ul className={subOpen ? `${styles.subnav} ${styles.subnavOpen}` : styles.subnav}>
                {collections.map((c) => (
                  <li key={c.id}>
                    <Link href={c.href} className={here(c.href) ? `${styles.subLink} ${styles.navActive}` : styles.subLink}>
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/collections/all/" className={styles.subAll}>
                    {t('common.nav.allCollections')}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/about/" className={linkClass('/about/')}>
                {t('common.nav.story')}
              </Link>
            </li>
            <li>
              <Link href="/#benefits" className={styles.navLink}>
                {t('common.nav.benefits')}
              </Link>
            </li>
            <li>
              <Link href="/contact/" className={linkClass('/contact/')}>
                {t('common.nav.contact')}
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.tools}>
          <button ref={searchToggle} type="button" className={styles.tool} aria-expanded={searchOpen} aria-controls="site-search" onClick={() => setSearchOpen(!searchOpen)}>
            <Icon>{searchOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M10.5 4a6.5 6.5 0 104.1 11.5L20 21M15 10.5a4.5 4.5 0 01-4.5 4.5" />}</Icon>
            <span className={styles.hidden}>{searchOpen ? t('common.tools.searchClose') : t('common.tools.searchOpen')}</span>
          </button>
          <Link href="/account/" className={styles.tool}>
            <Icon>
              <circle cx="12" cy="8.5" r="3.8" />
              <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
            </Icon>
            <span className={styles.hidden}>{t('common.tools.account')}</span>
          </Link>
          <Link href="/account/wishlist/" className={`${styles.tool} ${styles.toolWish}`}>
            <Icon>
              <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z" />
            </Icon>
            <span className={styles.hidden}>{wished > 0 ? t('common.tools.wishlistCount', { count: wished }) : t('common.tools.wishlist')}</span>
            {wished > 0 ? (
              <span className={styles.count} aria-hidden="true">
                {wished}
              </span>
            ) : null}
          </Link>
          <Link href="/cart/" className={styles.tool}>
            <Icon>
              <path d="M5.5 8h13l-1 12h-11z" />
              <path d="M9 8V6.5a3 3 0 016 0V8" />
            </Icon>
            <span className={styles.hidden}>{count > 0 ? t('common.tools.cartCount', { count }) : t('common.tools.cart')}</span>
            {count > 0 ? (
              <span className={styles.count} aria-hidden="true">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
      <div id="site-search" className={searchOpen ? `${styles.searchRow} ${styles.searchRowOpen}` : styles.searchRow}>
        {searchOpen ? <SearchField label={t('common.tools.search')} placeholder={t('common.tools.searchPrompt')} button={t('common.tools.search')} value="" onSearch={searchFor} suggest={4} className={styles.search} /> : null}
      </div>
    </header>
  )
}
