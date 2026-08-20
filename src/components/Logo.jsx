export default function Logo() {
  return (
    <a href="#home" className="brand" aria-label="R8 Sales home">
      <svg className="brand-svg" viewBox="0 0 132 48" aria-hidden="true" focusable="false">
        <text className="logo-r8" x="0" y="38">
          R8
        </text>
        <text className="logo-sales" x="68" y="34">
          SALES
        </text>
      </svg>
      <span className="brand-tagline">
        Right Opportunities.
        <br />
        Right People.
      </span>
    </a>
  )
}
