/* FRAME PRODUCTION lockup — redrawn from the official logo:
   monoline geometric wordmark (crossbar-less A), framed by
   top-left and bottom-right viewfinder brackets. */
const STROKE = 9;

const LETTERS = [
  // F
  { w: 50, d: "M3 97 L3 3 L50 3 M3 38 L40 38" },
  // R
  { w: 47, d: "M3 97 L3 3 L28 3 Q44 3 44 20 Q44 37 28 37 L3 37 M25 37 L46 97" },
  // A (crossbar-less)
  { w: 50, d: "M0 97 L25 3 L50 97" },
  // M
  { w: 52, d: "M3 97 L3 3 L26 60 L49 3 L49 97" },
  // E
  { w: 48, d: "M3 3 L3 97 M3 3 L48 3 M3 40 L38 40 M3 97 L48 97" },
];

const WORDMARK_WIDTH = LETTERS.reduce((acc, l) => acc + l.w + 20, -20);

const FrameLogo = ({ dark = false, glow = false, className = "" }) => (
  <span
    className={`inline-flex items-center ${dark ? "text-paper" : "text-ink"} ${glow ? "logo-glow" : ""} ${className}`}
    data-testid="frame-logo"
  >
    <svg viewBox="0 0 400 168" fill="none" className="h-8 w-auto sm:h-9" aria-label="FRAME PRODUCTION">
      {/* viewfinder brackets */}
      <path d="M10 54 L10 10 L54 10" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M390 114 L390 158 L346 158" stroke="currentColor" strokeWidth={STROKE} />
      {/* FRAME wordmark */}
      <g transform="translate(56, 14)" stroke="currentColor" strokeWidth={STROKE}>
        {LETTERS.reduce((els, l, i) => {
          els.push(<path key={i} d={l.d} transform={`translate(${els.x || 0}, 0)`} />);
          els.x = (els.x || 0) + l.w + 20;
          return els;
        }, [])}
      </g>
      {/* PRODUCTION */}
      <text
        x="58"
        y="160"
        fill="currentColor"
        opacity="0.8"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="500"
        fontSize="16"
        letterSpacing="13.5"
      >
        PRODUCTION
      </text>
    </svg>
  </span>
);

export default FrameLogo;
