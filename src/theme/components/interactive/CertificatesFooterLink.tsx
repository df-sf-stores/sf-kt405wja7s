'use client'

import type { ReactNode } from 'react'
import { Link, useLocation } from '@dripfunnel/storefront-core/theme'
import { isCertificatesPath } from '../certificates'

/** The footer's link to the Certificates & Registrations page, marked as the current page while the shopper is on it. */
export const CertificatesFooterLink = ({ className, currentClassName, children }: { className?: string; currentClassName?: string; children: ReactNode }) => {
  const { path } = useLocation()
  const here = isCertificatesPath(path)
  return (
    <span className={here ? currentClassName : undefined} aria-current={here ? 'page' : undefined}>
      <Link href="/certificates/" className={className}>
        {children}
      </Link>
    </span>
  )
}
