import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { PROJECTS, type ProjectId } from './content'
import Shape from './Shape'

/** Must match PlotField's grid so every site sits on a dot. */
const GRID = 24
const CLEAR = 52
/** One layout per page load: the sites land somewhere new on each visit, then stay put. */
const SEED = Math.floor(Math.random() * 2 ** 31)

type Spot = { x: number; y: number }
type Props = {
  label: string
  plotted: ProjectId
  copy: Record<ProjectId, { kind: string; badge: string }>
  open: string
  arrow: ReactNode
  onFocus: (id: ProjectId | null) => void
  onPick: (i: number) => void
}

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Layout box relative to `host`, ignoring transforms so entrance animations don't skew it. */
function box(el: HTMLElement, host: HTMLElement) {
  let x = 0
  let y = 0
  let n: HTMLElement | null = el
  while (n && n !== host) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent as HTMLElement | null
  }
  return { l: x, t: y, r: x + el.offsetWidth, b: y + el.offsetHeight }
}

/**
 * The projects, set as sites on the hero's dot grid: each one lands on a random free dot,
 * grows from that dot into its primitive, and opens a small sheet when the crosshair finds it.
 */
export default function PlotSites({ label, plotted, copy, open, arrow, onFocus, onPick }: Props) {
  const ref = useRef<HTMLUListElement>(null)
  const [spots, setSpots] = useState<(Spot | null)[]>([])
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const list = ref.current
    const host = list?.parentElement
    if (!list || !host) return

    const place = () => {
      const W = host.clientWidth
      const H = host.clientHeight
      const hr = host.getBoundingClientRect()
      const title = host.querySelector<HTMLElement>('.hero-line > span')
      const note = host.querySelector<HTMLElement>('.hero-note')
      const orbit = host.querySelector<SVGElement>('.orbit')?.getBoundingClientRect()
      // The corner note only shows on the wide layout, where the orbit sits beside the headline.
      const wide = !!note?.offsetParent
      const floor = (title ? box(title, host).t : H / 2) - CLEAR
      const right = wide && note ? box(note, host).l - CLEAR : W - GRID * 2
      // Wide, sites keep off the whole orbit; stacked, the orbit fills the top, so they keep off its drawing only.
      const oc = orbit && {
        x: orbit.left - hr.left + orbit.width / 2,
        y: orbit.top - hr.top + orbit.height / 2,
        r: wide ? orbit.width / 2 + CLEAR / 2 : orbit.width * 0.22 + CLEAR,
      }

      // Sites live only in the open sheet above the headline (and left of the corner note).
      const free: Spot[] = []
      for (let y = GRID / 2 + GRID * 2; y < floor; y += GRID)
        for (let x = GRID / 2 + GRID * 2; x < right; x += GRID) {
          if (oc && Math.hypot(x - oc.x, y - oc.y) < oc.r) continue
          free.push({ x, y })
        }

      const rand = rng(SEED)
      for (let i = free.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1))
        ;[free[i], free[j]] = [free[j], free[i]]
      }
      // Spread the sites out, settling for closer company only when the sheet is tight.
      let picked: Spot[] = []
      for (const gap of [260, 180, 120, 88]) {
        picked = []
        for (const s of free) {
          if (picked.every((p) => Math.hypot(p.x - s.x, p.y - s.y) >= gap)) picked.push(s)
          if (picked.length === PROJECTS.length) break
        }
        if (picked.length === PROJECTS.length) break
      }
      setWidth(W)
      setSpots(PROJECTS.map((_, i) => picked[i] ?? null))
    }

    place()
    const ro = new ResizeObserver(place)
    ro.observe(host)
    document.fonts?.ready.then(place)
    return () => ro.disconnect()
  }, [copy])

  return (
    <ul ref={ref} className="sites" aria-label={label}>
      {PROJECTS.map((pr, i) => {
        const s = spots[i]
        const c = copy[pr.id]
        return (
          <li
            key={pr.id}
            className={`site${plotted === pr.id ? ' is-lit' : ''}`}
            data-id={pr.id}
            data-side={s && s.x > width * 0.58 ? 'left' : 'right'}
            style={s ? { left: s.x, top: s.y, ['--i' as string]: i } : undefined}
            hidden={!s}
          >
            <a
              href="#projects"
              className="site-link"
              onMouseEnter={() => onFocus(pr.id)}
              onMouseLeave={() => onFocus(null)}
              onFocus={() => onFocus(pr.id)}
              onBlur={() => onFocus(null)}
              onClick={(e) => {
                e.preventDefault()
                onPick(i)
              }}
            >
              <span className="site-dot" aria-hidden="true" />
              <Shape id={pr.id} className="site-glyph" />
              <span className="site-card">
                <span className="site-name">{pr.name}</span>
                <span className="site-kind">{c.kind}</span>
                <span className="site-meta">
                  <span className="site-badge">{c.badge}</span>
                  <span className="site-open">
                    {open}
                    {arrow}
                  </span>
                </span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
