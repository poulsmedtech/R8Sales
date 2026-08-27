import { useEffect } from 'react'
import {
  Activity,
  ArrowRight,
  Flame,
  Gift,
  HeartHandshake,
  Phone,
  Smartphone,
  Sparkles,
  Sun,
} from 'lucide-react'
import { applyOpportunityHash, opportunities } from '../data/content'
import useReveal from '../hooks/useReveal'

const icons = {
  flame: Flame,
  sun: Sun,
  handshake: HeartHandshake,
  smartphone: Smartphone,
  phone: Phone,
  activity: Activity,
  gift: Gift,
  sparkles: Sparkles,
}

export default function Opportunities({ onLearnMore }) {
  const { ref, revealClass } = useReveal()

  useEffect(() => {
    applyOpportunityHash()
    window.addEventListener('hashchange', applyOpportunityHash)
    return () => window.removeEventListener('hashchange', applyOpportunityHash)
  }, [])

  return (
    <section className={`opportunities ${revealClass}`} id="opportunities" tabIndex={-1} ref={ref}>
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">Our Opportunities</p>
          <h2>Multiple Programs. Multiple Ways to Earn.</h2>
          <p>
            Explore our current opportunities to see how they work, who qualifies and what you
            can earn.
          </p>
        </div>

        <ul className="opportunity-grid">
          {opportunities.map((item) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="opportunity-card"
                  id={item.id}
                  onClick={() => onLearnMore(item)}
                  aria-label={`Learn more about ${item.title}`}
                >
                  <span className={`icon-badge tone-${item.tone}`} aria-hidden="true">
                    <Icon size={20} strokeWidth={2.1} />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="card-kicker">{item.subtitle}</p>
                  <p>{item.description}</p>
                  <span className="text-link" aria-hidden="true">
                    Learn More
                    <ArrowRight size={14} />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
