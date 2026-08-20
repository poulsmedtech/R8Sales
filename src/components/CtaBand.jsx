import { ArrowRight } from 'lucide-react'

export default function CtaBand({ onAction }) {
  return (
    <section className="cta-band" id="join">
      <div className="container cta-inner">
        <div className="cta-copy">
          <span className="cta-icon" aria-hidden="true">
            R8
          </span>
          <div>
            <h2>Your Next Opportunity May Be Here.</h2>
            <p>
              Explore the programs available through R8 Sales. See what they offer. See who
              qualifies. See what you can earn. Then decide what’s right for you.
            </p>
          </div>
        </div>
        <div className="cta-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAction('View All Opportunities')}
          >
            View All Opportunities
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-navy"
            onClick={() => onAction('Join the R8 Network')}
          >
            Join the R8 Network
          </button>
        </div>
      </div>
    </section>
  )
}
