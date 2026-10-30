import type { ProjectId } from './content'

type Props = { id: ProjectId; className?: string; x?: number; y?: number; size?: number }

/**
 * One primitive per project, plotted as a line drawing in a 100-unit box:
 * Codeboros a ring with a gap and a node at its open end (the loop), and Kantim
 * a roof over a square.
 * Strokes carry pathLength 1 and `data-plot`, so CSS can draw them in; stroke width is set in CSS.
 * Pass x/y/size to nest the drawing inside another SVG.
 */
export default function Shape({ id, className, x, y, size }: Props) {
  return (
    <svg
      className={className}
      data-shape={id}
      viewBox="0 0 100 100"
      x={x}
      y={y}
      width={size}
      height={size}
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        {id === 'codeboros' && (
          <>
            <path data-plot d="M66.9 18.2 A36 36 0 1 1 32.2 18.7" pathLength="1" vectorEffect="non-scaling-stroke" />
            <circle data-node cx="66.9" cy="18.2" r="4.2" fill="currentColor" stroke="none" />
          </>
        )}
        {id === 'kantim' && (
          <>
            <path data-plot d="M50 12 L86 44 H14 Z" pathLength="1" vectorEffect="non-scaling-stroke" />
            <path data-plot d="M22 52 H78 V88 H22 Z" pathLength="1" vectorEffect="non-scaling-stroke" />
            <circle data-node cx="50" cy="12" r="4.2" fill="currentColor" stroke="none" />
          </>
        )}
      </g>
    </svg>
  )
}
