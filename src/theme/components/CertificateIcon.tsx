import type { HighlightKey } from './certificates'

/** A minimal line icon for each credential: a rosette, a factory, a registered mark, a receipt and a leaf in a shield. */
const Glyph = ({ kind }: { kind: HighlightKey }) => {
  switch (kind) {
    case 'recognition':
      return (
        <>
          <circle cx="12" cy="9" r="5.5" />
          <path d="M9 13.8L7.5 21l4.5-2.5 4.5 2.5-1.5-7.2" />
          <path d="M12 6.5l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2z" />
        </>
      )
    case 'msme':
      return (
        <>
          <path d="M3 21V10l5 3V10l5 3V7l8 4v10z" />
          <path d="M3 21h18M7 17h2M12 17h2M17 17h2" />
        </>
      )
    case 'trademark':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.5 16.5v-9h3a2.5 2.5 0 010 5h-3M12.5 12.5l2.5 4" />
        </>
      )
    case 'gst':
      return (
        <>
          <path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </>
      )
    case 'fssai':
      return (
        <>
          <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" />
          <path d="M8.5 15.5c0-4 2.8-6.5 7-7-.3 4.3-2.8 7-7 7zM8.5 15.5l3.5-3.5" />
        </>
      )
  }
}

export const CertificateIcon = ({ kind, className }: { kind: HighlightKey; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <Glyph kind={kind} />
  </svg>
)
