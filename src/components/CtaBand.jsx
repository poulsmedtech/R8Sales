import { ArrowRight, UsersRound } from 'lucide-react'
import useReveal from '../hooks/useReveal'

export default function CtaBand({ onAction, onExplore }) {
  const { ref, revealClass } = useReveal()

  return (
    <section className={`cta-band ${revealClass}`} id="join" ref={ref}>
      <div className="container cta-inner">
        <div className="cta-copy">
          <span className="cta-icon" aria-hidden="true">
            <UsersRound size={28} strokeWidth={1.8} />
          </span>
          <div>
            <h2>Your Next Opportunity May Be Here.</h2>
            <p>
              Explore the programs available through R8 Sales Group. See what they offer. See who
              qualifies. See what you can earn. Then decide what’s right for you.
            </p>
          </div>
        </div>
        <div className="cta-actions">
          <button type="button" className="btn btn-primary" onClick={onExplore}>
            View All Opportunities
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => onAction('Join the R8 Network')}
          >
            Join the R8 Network
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
