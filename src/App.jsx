import { useCallback, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FounderMessage from './components/FounderMessage'
import Opportunities from './components/Opportunities'
import Benefits from './components/Benefits'
import AboutHao from './components/AboutHao'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import Modal from './components/Modal'
import BackToTop from './components/BackToTop'
import { getActionContent, getOpportunityContent, scrollToId } from './data/content'

export default function App() {
  const [modal, setModal] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const openAction = useCallback((title) => {
    setModal(getActionContent(title))
  }, [])

  const openOpportunity = useCallback((item) => {
    setModal(getOpportunityContent(item))
  }, [])

  const goToOpportunities = useCallback(() => {
    scrollToId('opportunities')
  }, [])

  const closeModal = useCallback(() => setModal(null), [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header onAction={openAction} onMenuChange={setMenuOpen} />
      <main id="main-content" tabIndex={-1}>
        <Hero onExplore={goToOpportunities} />
        <FounderMessage />
        <Opportunities onLearnMore={openOpportunity} />
        <Benefits />
        <AboutHao />
        <CtaBand onAction={openAction} onExplore={goToOpportunities} />
      </main>
      <Footer onAction={openAction} />
      <BackToTop overlayOpen={Boolean(modal) || menuOpen} />
      <Modal
        open={Boolean(modal)}
        title={modal?.title ?? ''}
        subtitle={modal?.subtitle}
        message={modal?.body ?? ''}
        note={modal?.note}
        paragraphs={modal?.paragraphs}
        eyebrow={modal?.eyebrow}
        icon={modal?.icon}
        tone={modal?.tone}
        contacts={modal?.contacts}
        onClose={closeModal}
      />
    </>
  )
}
