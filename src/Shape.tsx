import { useId } from 'react'
import type { ProjectId } from './content'

type Props = { id: ProjectId; className?: string; shaded?: boolean }

/**
 * One primitive per project, drawn in a 100-unit box:
 * Codeboros a ring with a gap (the loop), OpenMixing two overlapping discs
 * (two decks blending), OpenHouse a roof over a square.
 * `shaded` adds the soft light falloff used at background scale.
 */
export default function Shape({ id, className, shaded = false }: Props) {
  const uid = useId()
  const fill = shaded ? `url(#${uid}-g)` : 'currentColor'
  return (
    <svg className={className} data-shape={id} viewBox="0 0 100 100" aria-hidden="true" focusable="false" style={{ color: `var(--c-${id})` }}>
      {shaded && (
        <defs>
          <linearGradient id={`${uid}-g`} x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor={`var(--c-${id}-hi)`} />
            <stop offset="1" stopColor={`var(--c-${id})`} />
          </linearGradient>
        </defs>
      )}
      {id === 'codeboros' && (
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke={fill}
          strokeWidth="16"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="84 16"
          transform="rotate(-62 50 50)"
        />
      )}
      {id === 'openmixing' && (
        <>
          <circle cx="37" cy="50" r="29" fill={fill} />
          <circle cx="63" cy="50" r="29" fill={fill} fillOpacity="0.62" />
        </>
      )}
      {id === 'openhouse' && (
        <g fill={fill} stroke={fill} strokeWidth="4" strokeLinejoin="round">
          <path d="M50 10 L88 44 H12 Z" />
          <rect x="22" y="52" width="56" height="38" />
        </g>
      )}
    </svg>
  )
}
