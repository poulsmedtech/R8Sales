import {
  Clock3,
  DollarSign,
  Headphones,
  Package,
  TrendingUp,
  UserRound,
  Users,
  UsersRound,
} from 'lucide-react'
import { benefits } from '../data/content'
import useReveal from '../hooks/useReveal'

const icons = {
  package: Package,
  users: Users,
  clock: Clock3,
  dollar: DollarSign,
  user: UserRound,
  chart: TrendingUp,
  headset: Headphones,
  people: UsersRound,
}

export default function Benefits() {
  const { ref, revealClass } = useReveal()

  return (
    <section className={`benefits ${revealClass}`} id="why-r8" ref={ref}>
      <div className="container benefits-layout">
        <div className="benefits-intro">
          <p className="eyebrow">Why R8?</p>
          <h2>We Build Opportunities Around You.</h2>
          <p>
            R8 evaluates every program using our 8 Principles for Success to ensure we bring
            you only the right opportunities.
          </p>
        </div>

        <ol className="benefits-grid">
          {benefits.map((item) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.n}>
                <span className="benefit-num" aria-hidden="true">
                  {item.n}
                </span>
                <span className="benefit-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
