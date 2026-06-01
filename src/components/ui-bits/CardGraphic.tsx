/** Decorative AI/tech background graphic for cards. Pure SVG, no deps. */
export default function CardGraphic({ variant = "circuit", className = "" }: { variant?: "circuit" | "grid" | "wave" | "nodes"; className?: string }) {
  const stroke = "hsl(var(--gold) / 0.35)";
  const blue = "hsl(var(--primary) / 0.4)";
  return (
    <svg className={`pointer-events-none absolute inset-0 w-full h-full opacity-60 ${className}`} viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="cg-fade" x1="0" x2="1">
          <stop offset="0%" stopColor={blue} />
          <stop offset="100%" stopColor={stroke} />
        </linearGradient>
      </defs>
      {variant === "circuit" && (
        <g fill="none" stroke="url(#cg-fade)" strokeWidth="1">
          <path d="M0 40 H120 V80 H220 V40 H400" />
          <path d="M0 140 H80 V100 H260 V160 H400" />
          <circle cx="120" cy="40" r="3" fill={stroke} />
          <circle cx="220" cy="80" r="3" fill={blue} />
          <circle cx="80" cy="140" r="3" fill={stroke} />
          <circle cx="260" cy="100" r="3" fill={blue} />
        </g>
      )}
      {variant === "grid" && (
        <g stroke="url(#cg-fade)" strokeWidth="0.6">
          {Array.from({ length: 10 }).map((_, i) => <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />)}
        </g>
      )}
      {variant === "wave" && (
        <g fill="none" stroke="url(#cg-fade)" strokeWidth="1.2">
          <path d="M0 100 Q100 40 200 100 T400 100" />
          <path d="M0 130 Q100 70 200 130 T400 130" opacity="0.5" />
        </g>
      )}
      {variant === "nodes" && (
        <g fill="none" stroke="url(#cg-fade)" strokeWidth="0.8">
          <circle cx="80" cy="60" r="20" />
          <circle cx="200" cy="120" r="30" />
          <circle cx="320" cy="50" r="18" />
          <line x1="80" y1="60" x2="200" y2="120" />
          <line x1="200" y1="120" x2="320" y2="50" />
          <circle cx="80" cy="60" r="2" fill={stroke} />
          <circle cx="200" cy="120" r="2" fill={blue} />
          <circle cx="320" cy="50" r="2" fill={stroke} />
        </g>
      )}
    </svg>
  );
}
