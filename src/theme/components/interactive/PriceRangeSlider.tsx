'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { TextField, useStorefront } from '@dripfunnel/storefront-core/theme'
import { formatAmount } from '../shopFilters'
import styles from '../../styles/shopall.module.css'

type Range = { min: number; max: number }
type Handle = 'min' | 'max'

/**
 * Two handles on one track for the lowest and highest price, each a keyboard slider (arrows, Page Up and Down, Home and
 * End), with typed minimum and maximum prices under it. `bounds` is the catalogue's own price range.
 */
export const PriceRangeSlider = ({ bounds, value, onChange, currency }: { bounds: Range; value: Range; onChange: (range: Range) => void; currency: string }) => {
  const { t, locale } = useStorefront()
  const track = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<Handle | null>(null)
  const span = Math.max(bounds.max - bounds.min, 1)
  const step = Math.max(1, Math.round(span / 100))
  const money = (n: number) => formatAmount(n, currency, locale)

  useEffect(() => {
    track.current?.style.setProperty('--low', `${((value.min - bounds.min) / span) * 100}%`)
    track.current?.style.setProperty('--high', `${((value.max - bounds.min) / span) * 100}%`)
  }, [value.min, value.max, bounds.min, span])

  const clamp = (n: number) => Math.min(bounds.max, Math.max(bounds.min, n))
  const snap = (n: number) => clamp(n >= bounds.max ? bounds.max : bounds.min + Math.round((n - bounds.min) / step) * step)
  const set = (handle: Handle, n: number) => {
    const next = snap(n)
    onChange(handle === 'min' ? { min: Math.min(next, value.max), max: value.max } : { min: value.min, max: Math.max(next, value.min) })
  }

  const at = (clientX: number) => {
    const box = track.current?.getBoundingClientRect()
    if (!box || box.width === 0) return bounds.min
    return bounds.min + Math.min(1, Math.max(0, (clientX - box.left) / box.width)) * span
  }
  const down = (event: PointerEvent<HTMLDivElement>) => {
    const n = at(event.clientX)
    // The nearer handle moves; level handles part the way the pointer went.
    const handle: Handle = value.min === value.max ? (n < value.min ? 'min' : 'max') : Math.abs(n - value.min) <= Math.abs(n - value.max) ? 'min' : 'max'
    track.current?.setPointerCapture(event.pointerId)
    setDragging(handle)
    set(handle, n)
  }
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) set(dragging, at(event.clientX))
  }
  const up = (event: PointerEvent<HTMLDivElement>) => {
    if (track.current?.hasPointerCapture(event.pointerId)) track.current.releasePointerCapture(event.pointerId)
    setDragging(null)
  }
  const keys = (handle: Handle) => (event: KeyboardEvent<HTMLSpanElement>) => {
    const now = value[handle]
    const big = Math.max(step, Math.round(span / 10))
    const moves = new Map([
      ['ArrowLeft', now - step],
      ['ArrowDown', now - step],
      ['ArrowRight', now + step],
      ['ArrowUp', now + step],
      ['PageDown', now - big],
      ['PageUp', now + big],
      ['Home', handle === 'min' ? bounds.min : value.min],
      ['End', handle === 'max' ? bounds.max : value.max],
    ])
    const target = moves.get(event.key)
    if (target === undefined) return
    event.preventDefault()
    set(handle, target)
  }

  const thumb = (handle: Handle) => (
    <span
      role="slider"
      tabIndex={0}
      className={`${styles.thumb} ${handle === 'min' ? styles.thumbLow : styles.thumbHigh} ${dragging === handle ? styles.thumbActive : ''}`}
      aria-label={handle === 'min' ? t('shopall.filters.priceMinHandle') : t('shopall.filters.priceMaxHandle')}
      aria-valuemin={handle === 'min' ? bounds.min : value.min}
      aria-valuemax={handle === 'min' ? value.max : bounds.max}
      aria-valuenow={value[handle]}
      aria-valuetext={money(value[handle])}
      onKeyDown={keys(handle)}
    />
  )

  return (
    <div className={styles.price}>
      <div className={styles.priceEnds} aria-hidden="true">
        <span>{money(bounds.min)}</span>
        <span>{money(bounds.max)}</span>
      </div>
      <div ref={track} className={styles.track} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <span className={styles.trackFill} aria-hidden="true" />
        {thumb('min')}
        {thumb('max')}
      </div>
      <PriceInputs bounds={bounds} value={value} onChange={onChange} money={money} />
    </div>
  )
}

/** The typed minimum and maximum: a whole amount within the catalogue's range takes effect as it's typed. */
const PriceInputs = ({ bounds, value, onChange, money }: { bounds: Range; value: Range; onChange: (range: Range) => void; money: (n: number) => string }) => {
  const { t } = useStorefront()
  const [low, setLow] = useState(String(value.min))
  const [high, setHigh] = useState(String(value.max))
  useEffect(() => setLow(String(value.min)), [value.min])
  useEffect(() => setHigh(String(value.max)), [value.max])
  const typed = (words: string) => {
    const n = Number(words.replace(/[^\d]/g, ''))
    return words.trim() !== '' && Number.isFinite(n) && n >= bounds.min && n <= bounds.max ? n : null
  }
  return (
    <div className={styles.priceInputs}>
      <TextField
        label={t('shopall.filters.priceMin')}
        note={money(value.min)}
        inputMode="numeric"
        value={low}
        onChange={(words) => {
          setLow(words)
          const n = typed(words)
          if (n !== null) onChange({ min: n, max: Math.max(n, value.max) })
        }}
        className={styles.priceField}
      />
      <TextField
        label={t('shopall.filters.priceMax')}
        note={money(value.max)}
        inputMode="numeric"
        value={high}
        onChange={(words) => {
          setHigh(words)
          const n = typed(words)
          if (n !== null) onChange({ min: Math.min(n, value.min), max: n })
        }}
        className={styles.priceField}
      />
    </div>
  )
}
