import { useEffect, useRef } from 'react'
import type { ProjectId } from './content'

const GRID = 24
const LENS = 170
/** How close the pointer must come before the head locks onto a project site. */
const MAGNET = 72

type Vec = { x: number; y: number }

/**
 * The hero's drafting field: a graph-paper dot grid with a plotter head on it.
 * The head follows the pointer on a spring, with hairlines out to the frame and live
 * coordinates, and locks onto a project site (PlotSites) when it comes near one; left alone,
 * it travels to the site of whichever project the orbit is drawing.
 * Reduced motion keeps the head pinned to the pointer with no spring or tracing; touch gets the grid alone.
 */
export default function PlotField({ plotted }: { plotted: ProjectId }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const plottedRef = useRef(plotted)

  useEffect(() => {
    plottedRef.current = plotted
  }, [plotted])

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const still = !matchMedia('(pointer: fine)').matches
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const base = document.createElement('canvas')
    const bctx = base.getContext('2d')!
    let w = 0
    let h = 0
    let dpr = 1
    let ink = '#f2f2f0'
    let ink3 = '#8a8a87'
    let line = 'rgba(242,242,240,0.22)'
    let mono = 'monospace'

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement)
      ink = cs.getPropertyValue('--text').trim()
      ink3 = cs.getPropertyValue('--text-3').trim()
      line = cs.getPropertyValue('--line-2').trim()
      mono = cs.getPropertyValue('--mono').trim()
    }

    // The grid itself is static: draw it once per size or theme, then blit it each frame.
    const paintBase = () => {
      base.width = canvas.width
      base.height = canvas.height
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bctx.clearRect(0, 0, w, h)
      bctx.fillStyle = ink3
      bctx.globalAlpha = 0.55
      for (let y = GRID / 2; y < h; y += GRID)
        for (let x = GRID / 2; x < w; x += GRID) {
          bctx.beginPath()
          bctx.arc(x, y, 0.9, 0, Math.PI * 2)
          bctx.fill()
        }
    }

    const resize = () => {
      const r = host.getBoundingClientRect()
      dpr = Math.min(devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintBase()
      if (still) draw(null)
    }

    const pos: Vec = { x: 0, y: 0 }
    const vel: Vec = { x: 0, y: 0 }
    const target: Vec = { x: 0, y: 0 }
    let shown = 0
    let lastMove = -Infinity
    let pointerIn = false

    let ring = 11
    let locked = false

    /** Centres of the project sites, in canvas coordinates. */
    const sites = () => {
      const r = canvas.getBoundingClientRect()
      return [...document.querySelectorAll<HTMLElement>('.site:not([hidden])')].map((el) => {
        const g = el.querySelector('.site-glyph')!.getBoundingClientRect()
        return { id: el.dataset.id, x: g.left - r.left + g.width / 2, y: g.top - r.top + g.height / 2 }
      })
    }
    const nearest = (x: number, y: number) => {
      let best: { x: number; y: number } | null = null
      let d = MAGNET
      for (const s of sites()) {
        const dd = Math.hypot(s.x - x, s.y - y)
        if (dd < d) [best, d] = [s, dd]
      }
      return best
    }

    const draw = (head: Vec | null) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = 1
      ctx.drawImage(base, 0, 0, w, h)
      if (!head || shown <= 0.01) return

      // Lens: dots near the head come up to full ink and swell slightly.
      ctx.fillStyle = ink
      const x0 = Math.max(GRID / 2, Math.floor((head.x - LENS) / GRID) * GRID + GRID / 2)
      const y0 = Math.max(GRID / 2, Math.floor((head.y - LENS) / GRID) * GRID + GRID / 2)
      for (let y = y0; y < Math.min(h, head.y + LENS); y += GRID)
        for (let x = x0; x < Math.min(w, head.x + LENS); x += GRID) {
          const k = 1 - Math.hypot(x - head.x, y - head.y) / LENS
          if (k <= 0) continue
          const e = k * k * (3 - 2 * k)
          ctx.globalAlpha = e * 0.85 * shown
          ctx.beginPath()
          ctx.arc(x, y, 0.9 + e * 1.1, 0, Math.PI * 2)
          ctx.fill()
        }

      // Hairlines run out to the frame, with a tick where each meets it.
      ctx.globalAlpha = shown
      ctx.strokeStyle = line
      ctx.lineWidth = 1
      const hx = Math.round(head.x) + 0.5
      const hy = Math.round(head.y) + 0.5
      ctx.beginPath()
      ctx.moveTo(0, hy)
      ctx.lineTo(w, hy)
      ctx.moveTo(hx, 0)
      ctx.lineTo(hx, h)
      ctx.stroke()
      ctx.strokeStyle = ink3
      ctx.beginPath()
      ctx.moveTo(0.5, hy - 6)
      ctx.lineTo(0.5, hy + 6)
      ctx.moveTo(w - 0.5, hy - 6)
      ctx.lineTo(w - 0.5, hy + 6)
      ctx.moveTo(hx - 6, 0.5)
      ctx.lineTo(hx + 6, 0.5)
      ctx.stroke()

      // The head: a ring, a node and a short cross.
      ctx.strokeStyle = ink
      ctx.beginPath()
      ctx.arc(head.x, head.y, ring, 0, Math.PI * 2)
      ctx.moveTo(head.x - ring - 7, hy)
      ctx.lineTo(head.x - ring - 2, hy)
      ctx.moveTo(head.x + ring + 2, hy)
      ctx.lineTo(head.x + ring + 7, hy)
      ctx.moveTo(hx, head.y - ring - 7)
      ctx.lineTo(hx, head.y - ring - 2)
      ctx.moveTo(hx, head.y + ring + 2)
      ctx.lineTo(hx, head.y + ring + 7)
      ctx.stroke()
      if (!locked) {
        ctx.fillStyle = ink
        ctx.beginPath()
        ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Locked onto a site under the pointer, the site's own card does the talking.
      if (locked && pointerIn) return

      // Live readout, flipped to stay inside the field.
      const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0')
      const label = `X ${pad(head.x)}  Y ${pad(head.y)}`
      const sub = pointerIn ? null : `plot ${plottedRef.current}`
      ctx.font = `500 11px ${mono}`
      ctx.textBaseline = 'top'
      const tw = Math.max(ctx.measureText(label).width, sub ? ctx.measureText(sub).width : 0)
      const off = ring + 13
      const right = head.x + off + 2 + tw < w - 12
      const below = head.y + off + 30 < h
      const lx = right ? head.x + off : head.x - off - tw
      const ly = below ? head.y + off - 2 : head.y - off + 2 - (sub ? 30 : 14)
      ctx.textAlign = 'left'
      ctx.fillStyle = ink
      ctx.globalAlpha = 0.9 * shown
      ctx.fillText(label, lx, ly)
      if (sub) {
        ctx.fillStyle = ink3
        ctx.fillText(sub, lx, ly + 16)
      }
    }

    readTheme()
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const mo = new MutationObserver(() => {
      readTheme()
      paintBase()
      if (still) draw(null)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    document.fonts?.ready.then(readTheme)

    if (still) {
      return () => {
        ro.disconnect()
        mo.disconnect()
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      pointerIn = x >= 0 && y >= 0 && x <= r.width && y <= r.height
      if (!pointerIn) return
      const site = nearest(x, y)
      locked = !!site
      target.x = site?.x ?? x
      target.y = site?.y ?? y
      lastMove = performance.now()
      if (calm) {
        pos.x = target.x
        pos.y = target.y
        ring = locked ? 34 : 11
      }
    }
    const onLeave = () => {
      pointerIn = false
    }
    if (calm) {
      const snap = (e: PointerEvent) => {
        onMove(e)
        shown = pointerIn ? 1 : 0
        draw(pos)
      }
      window.addEventListener('pointermove', snap, { passive: true })
      return () => {
        ro.disconnect()
        mo.disconnect()
        window.removeEventListener('pointermove', snap)
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    let raf = 0
    let prev = performance.now()
    const born = prev
    let placed = false
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const idle = !pointerIn || now - lastMove > 2600
      if (idle) {
        pointerIn = false
        const p = sites().find((s) => s.id === plottedRef.current)
        locked = !!p
        if (p) {
          target.x = p.x
          target.y = p.y
        }
      }
      ring += ((locked ? 34 : 11) - ring) * Math.min(1, dt * 10)
      if (!placed && (target.x || target.y)) {
        pos.x = target.x
        pos.y = target.y
        placed = true
      }
      // A spring just shy of critical damping: it arrives with the faintest settle.
      const k = idle ? 46 : 150
      const c = 2 * Math.sqrt(k) * 0.86
      vel.x += (k * (target.x - pos.x) - c * vel.x) * dt
      vel.y += (k * (target.y - pos.y) - c * vel.y) * dt
      pos.x += vel.x * dt
      pos.y += vel.y * dt
      // The head arrives once the orbit has drawn itself.
      const want = now - born > 2200 && placed ? 1 : 0
      shown += (want - shown) * Math.min(1, dt * 4)
      draw(pos)
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (e.isIntersecting) {
        prev = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="plot-field" aria-hidden="true" />
}
