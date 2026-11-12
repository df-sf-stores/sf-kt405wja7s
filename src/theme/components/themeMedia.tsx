import { MerchantImage, ThemeImage } from '@dripfunnel/storefront-core/theme'
import { uploaded } from './assets'
import type { CertificateKey } from './certificates'
import type { ReportKey } from './labReports'

/**
 * The client's certificate and laboratory report originals held in the theme itself (src/theme/media/), each with its
 * own width ÷ height so a box shows the whole page uncropped. The build publishes them with the theme, so they show on
 * the live store as well as in `pnpm dev`. Names are written out because <ThemeImage src> must name a file there, and
 * `pnpm check` holds each one to a file that is.
 */
export const certificateImages = {
  recognition: { file: 'insight-certifcates.png', ratio: 552 / 765 },
  msme: { file: 'msme.png', ratio: 265 / 481 },
  trademark: { file: 'tm-renewal-e-register.png', ratio: 607 / 827 },
  register: { file: 'trade-mark.png', ratio: 811 / 435 },
  gst: { file: 'gstt.png', ratio: 787 / 817 },
  fssai: { file: 'fssai.png', ratio: 787 / 832 },
} as const satisfies Record<CertificateKey, { file: string; ratio: number }>

export const reportImages = {
  cough: { file: 'etrl-report-cough.jpg', ratio: 4176 / 5667 },
  diabetic: { file: 'etrl-report-diabetic.jpg', ratio: 3961 / 5575 },
  ginger: { file: 'etrl-report-ginger.jpg', ratio: 4129 / 5280 },
  herbal: { file: 'etrl-report-herbal.jpg', ratio: 3867 / 5488 },
  tulsi: { file: 'etrl-report-tulsi.jpg', ratio: 3706 / 5250 },
  weightLoss: { file: 'etrl-report-weight-loss.jpg', ratio: 3786 / 5327 },
} as const satisfies Record<ReportKey, { file: string; ratio: number }>

/** One of the theme's own certificate or report pictures, by file name. */
export type ThemeFile = (typeof certificateImages)[CertificateKey]['file'] | (typeof reportImages)[ReportKey]['file']

/** A picture to show: a Storefront › Assets upload by id, or one of the theme's own files. */
export type ViewerPicture = { asset: string; file?: undefined; ratio?: undefined } | { asset?: undefined; file: ThemeFile; ratio: number }

/**
 * A certificate's or report's picture: the Storefront › Assets upload when its id has been written into the words file
 * (which also gives the shopper the original file to open), otherwise the theme's own copy, so no card waits on an id.
 */
export const certificatePicture = (key: CertificateKey, assetId: string): ViewerPicture => {
  const id = uploaded(assetId)
  return id ? { asset: id } : certificateImages[key]
}

export const reportPicture = (key: ReportKey, assetId: string): ViewerPicture => {
  const id = uploaded(assetId)
  return id ? { asset: id } : reportImages[key]
}

/**
 * How wide each place shows a picture, for the browser to pick a file size: the certificate and report cards on their
 * pages and on the home page, and the two viewers. Written as a fixed set so the validator knows they're not words.
 */
type PictureSizes =
  | '(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw'
  | '(min-width: 1200px) 360px, (min-width: 640px) 46vw, 92vw'
  | '(min-width: 1280px) 220px, (min-width: 900px) 30vw, (min-width: 700px) 45vw, 50vw'
  | '(min-width: 1080px) 220px, (min-width: 700px) 30vw, 50vw'
  | '(min-width: 1200px) 1200px, 100vw'
  | '(min-width: 1200px) 1600px, 100vw'

/** Draws a picture whichever way it's held; an upload, whose shape the theme can't know, takes `uploadRatio`. */
export const Picture = ({ picture, alt, uploadRatio, sizes, className }: { picture: ViewerPicture; alt: string; uploadRatio: number; sizes: PictureSizes; className?: string }) =>
  picture.file ? (
    <ThemeImage src={picture.file} alt={alt} ratio={picture.ratio} sizes={sizes} {...(className ? { className } : {})} />
  ) : (
    <MerchantImage asset={picture.asset} alt={alt} ratio={uploadRatio} sizes={sizes} {...(className ? { className } : {})} />
  )
