/**
 * Single brand motif: qoshqar-muiz (ram's horn) drawn as one thin line.
 * Used with restraint: section divider strip and a low-opacity hero curl.
 */
export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`h-4 w-auto text-accent ${className}`}
      viewBox="0 0 120 24"
      fill="none"
    >
      <path
        d="M60 2 v20 M60 8 q-22 2 -23 14 M60 8 q22 2 23 14 M60 14 q-11 0 -12 8 M60 14 q11 0 12 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OrnamentCurl({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 400 400"
      fill="none"
    >
      <path
        d="M200 40 v320 M200 110 q-90 8 -95 105 q-3 80 68 84 q54 3 58 -50 q3 -38 -31 -42 M200 110 q90 8 95 105 q3 80 -68 84 q-54 3 -58 -50 q-3 -38 31 -42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Minimal geometric pigeon mark for the logo. */
export function KepterMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 32 32" fill="none">
      <path
        d="M6 22 q2 -12 12 -13 q8 -1 10 6 q1 6 -5 9 q-8 4 -17 -2 z M17 9 q6 -6 12 -4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
