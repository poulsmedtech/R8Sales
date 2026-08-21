import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop({ overlayOpen = false }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      const founder = document.querySelector('.founder-message')
      const footer = document.querySelector('.site-footer')
      const ctaActions = document.querySelector('.cta-actions')
      const pastFounder = founder ? founder.getBoundingClientRect().bottom < 72 : window.scrollY > 420
      const footerBlocking = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 8
        : false
      const ctaBlocking = ctaActions
        ? ctaActions.getBoundingClientRect().bottom > window.innerHeight - 80 &&
          ctaActions.getBoundingClientRect().top < window.innerHeight
        : false

      setVisible(pastFounder && !footerBlocking && !ctaBlocking && !overlayOpen)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [overlayOpen])

  function goToTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const home = document.getElementById('home')
    const heading = home?.querySelector('h1')
    const main = document.getElementById('main-content')

    if (home) {
      home.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    }

    if (heading instanceof HTMLElement) {
      heading.focus({ preventScroll: true })
    } else if (main instanceof HTMLElement) {
      main.focus({ preventScroll: true })
    }
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      hidden={!visible}
      onClick={goToTop}
    >
      <ArrowUp size={18} strokeWidth={2.2} aria-hidden="true" />
      <span className="sr-only">Back to top</span>
    </button>
  )
}
