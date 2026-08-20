import { ArrowRight } from 'lucide-react'
import { heroPrinciples } from '../data/content'

export default function Hero({ onExplore }) {
  return (
    <section className="hero" id="home">
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source type="image/webp" media="(max-width: 700px)" srcSet="/images/hero-800.webp" />
          <source type="image/webp" srcSet="/images/hero-1600.webp" />
          <img
            src="/images/hero-1600.webp"
            alt=""
            width="1600"
            height="1067"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <img className="hero-people" src="/images/hero-people.svg" alt="" width="640" height="90" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>
            One Network.
            <span className="hero-line">Multiple Opportunities.</span>
            <span className="hero-accent">Unlimited Potential.</span>
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
          <button type="button" className="btn btn-primary" onClick={onExplore}>
            Explore Our Opportunities
            <ArrowRight size={15} aria-hidden="true" />
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
