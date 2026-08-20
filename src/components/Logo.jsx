export default function Logo({ variant = 'dark', compact = false }) {
  return (
    <a href="#home" className={`brand brand--${variant}`} aria-label="R8 Sales home">
      <span className="brand-mark">
        <span className="brand-r8">R8</span>
        <span className="brand-sales">SALES</span>
      </span>
      {!compact && (
        <span className="brand-tagline">
          Right Opportunities.
          <br />
          Right People.
        </span>
      )}
    </a>
  )
}
