// Custom mark: a tooth silhouette whose crown is split by a lotus-petal "S" curve,
// a nod to dentistry, Nepal (lotus) and her initial. A small sparkle marks a healthy smile.
export function LogoMark({ size = 44, tone = "dark" }) {
  const ink = tone === "dark" ? "var(--ink)" : "#fff";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Dr. Sudina Humagain logo"
    >
      <path
        d="M32 13.5c-4.6-3.8-17.4-5-19.6 6.2-1.7 8.6 3.1 14.3 5 24.1 1.8 9.4 3.6 13.7 6.6 13.7 4.2 0 3.6-11.8 8-13.4 4.4 1.6 3.8 13.4 8 13.4 3 0 4.8-4.3 6.6-13.7 1.9-9.8 6.7-15.5 5-24.1C49.4 8.5 36.6 9.7 32 13.5Z"
        fill="none"
        stroke={ink}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* lotus-petal S */}
      <path
        d="M39.5 21.5c-2.6-3-9.8-3.2-11.3.6-1.9 4.9 11.9 4.3 9.9 10.6-1.3 4.1-9 4.3-11.8.8"
        fill="none"
        stroke="var(--rose)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* sparkle */}
      <path
        d="M52 6.5l1.4 3.6 3.6 1.4-3.6 1.4L52 16.5l-1.4-3.6-3.6-1.4 3.6-1.4z"
        fill="var(--rose)"
      />
    </svg>
  );
}

export default function Logo({ tone = "dark", compact = false }) {
  return (
    <span className={`logo logo--${tone}`}>
      <LogoMark tone={tone} />
      {!compact && (
        <span className="logo__text">
          <span className="logo__name">
            Dr. Sudina <em>Humagain</em>
          </span>
          <span className="logo__sub">BDS · Dental Surgeon</span>
        </span>
      )}
    </span>
  );
}
