'use client'

import type { ReactNode } from 'react'
import { Link, useLocation } from '@dripfunnel/storefront-core/theme'

/** The footer's link to the Herbal Tea Recipes page, marked as the current page while the shopper is on it. */
export const RecipesFooterLink = ({ className, currentClassName, children }: { className?: string; currentClassName?: string; children: ReactNode }) => {
  const { path } = useLocation()
  const here = path.replace(/^\/+|\/+$/g, '').split('/').at(-1) === 'herbal-tea-recipes'
  return (
    <span className={here ? currentClassName : undefined} aria-current={here ? 'page' : undefined}>
      <Link href="/herbal-tea-recipes/" className={className}>
        {children}
      </Link>
    </span>
  )
}
