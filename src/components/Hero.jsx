import { heroPrinciples } from '../data/content'

export default function Hero({ onAction }) {
  return (
    <section className="hero" id="home">
      <div className="hero-media" aria-hidden="true">
        <img src="/images/hero-skyline.jpg" alt="" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>
            One Network.
            <span>Multiple Opportunities.</span>
            <span>Unlimited Potential.</span>
          </h1>
          <p>
            R8 Sales brings together proven sales leadership, a nationwide network of
            experienced agents and managers, and a continually evolving portfolio of sales
            opportunities.
          </p>
          <p>
            <strong>We do the work of finding and evaluating the programs.</strong> You decide
            which opportunities are right for you.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAction('Explore Our Opportunities')}
          >
            Explore Our Opportunities
          </button>
        </div>

        <aside className="why-panel" aria-labelledby="why-panel-title">
          <p className="eyebrow">Why R8?</p>
          <h2 id="why-panel-title">
            Right Opportunities.
            <br />
            Right People.
          </h2>
          <p>We evaluate every opportunity using our 8 Principles for Success.</p>
          <ol className="principle-grid">
            {heroPrinciples.map((item) => (
              <li key={item.n}>
                <span>{item.n}</span>
                {item.label}
              </li>
            ))}
          </ol>
          <p className="why-panel-foot">
            Eight principles. One goal.
            <strong> Your success.</strong>
          </p>
        </aside>
      </div>
    </section>
  )
}
