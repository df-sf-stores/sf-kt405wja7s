'use client'

import type { ReactNode } from 'react'
import { Link, useLocation } from '@dripfunnel/storefront-core/theme'
import { isTestimonialsPath } from '../testimonials'

/** The footer's link to the Customer Testimonials page, marked as the current page while the shopper is on it. */
export const TestimonialsFooterLink = ({ className, currentClassName, children }: { className?: string; currentClassName?: string; children: ReactNode }) => {
  const { path } = useLocation()
  const here = isTestimonialsPath(path)
  return (
    <span className={here ? currentClassName : undefined} aria-current={here ? 'page' : undefined}>
      <Link href="/testimonials/" className={className}>
        {children}
      </Link>
    </span>
  )
}
