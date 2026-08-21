import { Play } from 'lucide-react'
import MediaPlaceholder from './MediaPlaceholder'
import useReveal from '../hooks/useReveal'

export default function FounderMessage({ onAction }) {
  const { ref, revealClass } = useReveal()

  return (
    <section
      className={`founder-message ${revealClass}`}
      aria-labelledby="founder-message-title"
      ref={ref}
    >
      <div className="container founder-message-grid">
        <div>
          <p className="eyebrow">A Message from Hao Zhang</p>
          <h2 id="founder-message-title">Why I Created R8 Sales Group</h2>
          <p>
            Watch Hao explain his vision for R8 and how we help agents and managers
            build successful, profitable businesses.
          </p>
          <button
            type="button"
            className="btn btn-navy"
            onClick={() => onAction('Watch Video Message')}
          >
            <Play size={16} fill="currentColor" aria-hidden="true" />
            Watch Video Message
          </button>
        </div>

        <button
          type="button"
          className="video-card"
          onClick={() => onAction('Watch Video Message')}
          aria-label="Play founder video message from Hao Zhang"
        >
          <MediaPlaceholder variant="video" label="Founder video coming soon" />
        </button>
      </div>
    </section>
  )
}
