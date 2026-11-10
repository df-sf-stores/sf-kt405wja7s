import { Image, Link, Price, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { WishlistHeart } from './interactive/WishlistHeart'
import styles from '../styles/landing.module.css'

/**
 * A product as the home page shows it: its pack on a soft ground, name, price and stock, with the way to buy. A card
 * carries no versions, so "Choose & Add to Cart" opens the product, where the size is chosen and added.
 */
export const TeaCard = ({ product }: { product: ProductCard }) => {
  const { store, locale, t } = useStorefront()
  const inStock = product.stock.inStock
  return (
    <article className={styles.card}>
      <div className={styles.cardPicture}>
        <Link href={product.href} className={styles.cardPictureLink}>
          {product.photo ? (
            <Image image={product.photo} alt={product.photo.alt ?? product.name} ratio={1} sizes="(min-width: 1080px) 280px, (min-width: 700px) 30vw, 50vw" className={styles.cardImage} />
          ) : (
            <span className={styles.cardNoPicture}>{t('home.card.noPicture')}</span>
          )}
        </Link>
        {product.badges[0] ? <span className={styles.cardBadge}>{product.badges[0].label}</span> : null}
        {inStock ? null : <span className={styles.cardSoldOut}>{t('home.card.soldOut')}</span>}
        <span className={styles.cardHeart}>
          <WishlistHeart productId={product.id} name={product.name} versionId={null} />
        </span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardMeta}>{product.from ? t('home.card.sizes') : t('home.card.single')}</p>
        <h3 className={styles.cardName}>
          <Link href={product.href} className={styles.cardNameLink}>
            {product.name}
          </Link>
        </h3>
        {product.price ? (
          <p className={styles.cardPrice}>
            {product.from ? <span className={styles.cardFrom}>{t('home.card.from')}</span> : null}
            <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.price} />
          </p>
        ) : null}
        <div className={styles.cardActions}>
          {inStock ? (
            <Link href={product.href} className={styles.cardBuy}>
              <svg className={styles.cardBuyIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M5.5 8h13l-1 12h-11z" />
                <path d="M9 8V6.5a3 3 0 016 0V8" />
              </svg>
              <span aria-hidden="true">{t('home.card.buy')}</span>
              <span className={styles.hidden}>{t('home.card.buyLabel', { name: product.name })}</span>
            </Link>
          ) : (
            <span className={styles.cardUnavailable}>{t('home.card.unavailable')}</span>
          )}
          <Link href={product.href} className={styles.cardDetails}>
            {t('home.card.details')}
          </Link>
        </div>
      </div>
    </article>
  )
}
