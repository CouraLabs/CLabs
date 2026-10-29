/**
 * The CL monogram as a plotted line drawing: five sides of a hexagon make the C, and the L
 * drops through its middle, its foot closing the hexagon's lower-right side. The node sits
 * where the foot ends. Same drawing as icons/couralabs-glyph.svg.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={`logo ${className}`.trim()} data-shape viewBox="-6 -6 112 112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path className="logo-c" data-plot pathLength={1} vectorEffect="non-scaling-stroke" d="M82.9 31 L50 12 L17.1 31 V69 L40.1 82.3" />
      <g className="logo-stem">
        <path className="logo-l" data-plot pathLength={1} vectorEffect="non-scaling-stroke" d="M50 34 V88 L82.9 69" />
        <circle className="logo-node" data-node cx="82.9" cy="69" r="4.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}
