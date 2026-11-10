'use client'

import { Image, Link, Price, useStorefront } from '@dripfunnel/storefront-core/theme'
import type { CatalogueItem } from './shopCatalogue'
import { WishlistHeart } from './WishlistHeart'
import styles from '../../styles/shopall.module.css'

/**
 * One product of the Shop All grid: its photograph whole on an ivory square, its collection, name, price (core's sealed
 * price, "From" when its pack sizes cost different amounts), stock, the way to its page and the wishlist heart. A listing
 * carries no versions, so the pack size is chosen and added to the cart on the product's page.
 */
export const ShopProductCard = ({ item, collection }: { item: CatalogueItem; collection: string | null }) => {
  const { store, locale, t } = useStorefront()
  const { card } = item
  const inStock = card.stock.inStock
  const nameId = `product-${card.id}`
  return (
    <article className={styles.card} aria-labelledby={nameId}>
      <div className={styles.media}>
        <Link href={card.href} className={styles.mediaLink}>
          {card.photo ? (
            <Image image={card.photo} alt={card.photo.alt ?? card.name} ratio={1} sizes="(min-width: 1280px) 260px, (min-width: 960px) 30vw, (min-width: 600px) 45vw, 50vw" className={styles.mediaImage} />
          ) : (
            <span className={styles.noPicture}>{t('shopall.card.noPicture')}</span>
          )}
        </Link>
        {card.badges[0] ? <span className={styles.badge}>{card.badges[0].label}</span> : null}
        <span className={styles.wish}>
          <WishlistHeart productId={card.id} name={card.name} versionId={null} />
        </span>
      </div>
      <div className={styles.cardBody}>
        {collection ? <p className={styles.cardCollection}>{collection}</p> : null}
        <h3 id={nameId} className={styles.cardName}>
          <Link href={card.href} className={styles.cardNameLink}>
            {card.name}
          </Link>
        </h3>
        <div className={styles.cardMeta}>
          {card.price ? (
            <p className={styles.cardPrice}>
              {card.from ? <span className={styles.from}>{t('shopall.card.from')}</span> : null}
              <Price money={card.price} compareAt={card.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.priceTag} />
            </p>
          ) : null}
          <p className={inStock ? styles.stock : `${styles.stock} ${styles.stockOut}`}>
            <span className={styles.stockDot} aria-hidden="true" />
            {inStock ? t('shopall.card.inStock') : t('shopall.card.outOfStock')}
          </p>
        </div>
        {card.from ? <p className={styles.sizeOnly}>{t('shopall.card.morePacks')}</p> : null}
        <div className={styles.actions}>
          <Link href={card.href} className={styles.add}>
            {card.from && inStock ? t('shopall.card.choose') : t('shopall.card.view')}
          </Link>
        </div>
      </div>
    </article>
  )
}
