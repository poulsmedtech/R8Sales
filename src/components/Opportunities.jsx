import { useEffect } from 'react'
import {
  Activity,
  ArrowRight,
  Gift,
  Heart,
  Phone,
  Smartphone,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react'
import { opportunities } from '../data/content'

const icons = {
  zap: Zap,
  sun: Sun,
  heart: Heart,
  smartphone: Smartphone,
  phone: Phone,
  activity: Activity,
  gift: Gift,
  sparkles: Sparkles,
}

export default function Opportunities({ onAction }) {
  useEffect(() => {
    function emphasizeTarget() {
      const id = window.location.hash.replace('#', '')
      const card = opportunities.some((item) => item.id === id)
        ? document.getElementById(id)
        : null
      if (card instanceof HTMLElement) {
        card.focus({ preventScroll: true })
      }
    }

    emphasizeTarget()
    window.addEventListener('hashchange', emphasizeTarget)
    return () => window.removeEventListener('hashchange', emphasizeTarget)
  }, [])

  return (
    <section className="opportunities" id="opportunities">
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
              <li className="opportunity-card" id={item.id} key={item.id} tabIndex={-1}>
                <span className={`icon-badge tone-${item.tone}`} aria-hidden="true">
                  <Icon size={20} strokeWidth={2.1} />
                </span>
                <h3>{item.title}</h3>
                <p className="card-kicker">{item.subtitle}</p>
                <p>{item.description}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => onAction(item.title)}
                >
                  Learn More
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
