/**
 * The CL monogram: a squared C open to the right, with a stem hanging from its top bar
 * and the bottom bar running on as the L's foot. Round caps match the project primitives.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`logo ${className}`.trim()}
      viewBox="15 17 78 66"
      fill="none"
      stroke="currentColor"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path className="logo-c" d="M62 24H38Q22 24 22 40V60Q22 76 38 76H86" pathLength="100" />
      <g className="logo-stem">
        <path className="logo-l" d="M62 24V56" pathLength="100" />
      </g>
    </svg>
  )
}
