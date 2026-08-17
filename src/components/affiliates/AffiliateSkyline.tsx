export function AffiliateSkyline({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 800 280" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d67c2" />
          <stop offset="55%" stopColor="#0c3163" />
          <stop offset="100%" stopColor="#081e3e" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#sky)" />
      <circle cx="640" cy="58" r="28" fill="#fe4812" opacity="0.85" />
      <g fill="#06152c">
        <rect x="40" y="150" width="52" height="130" />
        <rect x="102" y="118" width="44" height="162" />
        <rect x="156" y="162" width="70" height="118" />
        <rect x="236" y="96" width="38" height="184" />
        <rect x="284" y="132" width="90" height="148" />
        <rect x="384" y="78" width="48" height="202" />
        <polygon points="432,78 456,42 480,78" />
        <rect x="448" y="150" width="62" height="130" />
        <rect x="520" y="108" width="40" height="172" />
        <rect x="570" y="140" width="86" height="140" />
        <rect x="666" y="88" width="46" height="192" />
        <rect x="722" y="160" width="58" height="120" />
      </g>
      <g fill="#fe4812" opacity="0.35">
        <rect x="112" y="132" width="8" height="10" />
        <rect x="248" y="110" width="8" height="10" />
        <rect x="396" y="96" width="8" height="10" />
        <rect x="678" y="104" width="8" height="10" />
      </g>
      <text
        x="40"
        y="52"
        fill="white"
        fontSize="18"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="3"
      >
        {label.toUpperCase().slice(0, 28)}
      </text>
    </svg>
  );
}
