export default function Logo() {
  return (
    <a href="#home" className="brand" aria-label="R8 Sales Group home">
      <span className="brand-lockup" aria-hidden="true">
        <svg className="brand-mark" viewBox="0 0 86 48" focusable="false">
          <text className="logo-r8" x="0" y="40">
            R8
          </text>
        </svg>
        <span className="brand-wordmark">
          <span>SALES</span>
          <span>GROUP</span>
        </span>
      </span>
      <span className="brand-tagline">
        Right Opportunities.
        <br />
        Right People.
      </span>
    </a>
  )
}
