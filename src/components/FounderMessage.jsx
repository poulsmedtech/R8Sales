import { useState } from 'react'
import { Play } from 'lucide-react'
import { founderVideo, scrollToId } from '../data/content'
import useReveal from '../hooks/useReveal'

export default function FounderMessage() {
  const { ref, revealClass } = useReveal()
  const [autoplay, setAutoplay] = useState(false)

  function playVideo() {
    setAutoplay(true)
    scrollToId('founder-video')
  }

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
          <button type="button" className="btn btn-navy" onClick={playVideo}>
            <Play size={16} fill="currentColor" aria-hidden="true" />
            Watch Video Message
          </button>
        </div>

        <div className="founder-video" id="founder-video" tabIndex={-1}>
          <iframe
            src={`${founderVideo.embedSrc}${autoplay ? '&autoplay=1' : ''}`}
            title={founderVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
