/** The brand's mark: a cup with a rising tulsi leaf, drawn in line so it takes the colour of the text around it. */
export const BrandMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
    <path d="M11 21h16v2.5a8 8 0 01-16 0z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M27 22.5h1.5a2.5 2.5 0 010 5H26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10 33.5h20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M19 18.5c-3.5-1-5-4.6-3.2-8.8 4 .6 6 4 3.2 8.8z" fill="currentColor" opacity="0.9" />
    <path d="M20.5 18.5c1.4-3.6 4.4-5 7.5-4.4-.4 3.2-3.4 5-7.5 4.4z" fill="currentColor" opacity="0.6" />
  </svg>
)

/** A fine botanical sprig, used as a quiet ornament beside headings and in empty corners of a section. */
export const Sprig = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <path d="M18 108C40 80 62 52 104 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M40 80c-10-2-17-10-17-22 11 2 18 10 17 22z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M40 80c4-10 13-15 25-14-4 10-13 15-25 14z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M60 57c-9-3-14-11-13-22 10 3 15 11 13 22z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M60 57c5-9 14-13 25-11-5 9-14 13-25 11z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M80 36c-7-4-10-11-8-20 8 4 11 11 8 20z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M80 36c5-7 12-10 21-7-5 7-12 9-21 7z" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)
