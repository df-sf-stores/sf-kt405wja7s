'use client'

import type { ReactNode } from 'react'
import { Link, useLocation } from '@dripfunnel/storefront-core/theme'
import { isReportsPath } from '../labReports'

/** The footer's link to the Laboratory Test Reports page, marked as the current page while the shopper is on it. */
export const LabReportsFooterLink = ({ className, currentClassName, children }: { className?: string; currentClassName?: string; children: ReactNode }) => {
  const { path } = useLocation()
  const here = isReportsPath(path)
  return (
    <span className={here ? currentClassName : undefined} aria-current={here ? 'page' : undefined}>
      <Link href="/laboratory-test-reports/" className={className}>
        {children}
      </Link>
    </span>
  )
}
