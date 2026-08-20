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
import { getActionContent, getOpportunityContent, scrollToId } from './data/content'

export default function App() {
  const [modal, setModal] = useState(null)

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
      <Header onAction={openAction} />
      <main id="main-content" tabIndex={-1}>
        <Hero onExplore={goToOpportunities} />
        <FounderMessage onAction={openAction} />
        <Opportunities onLearnMore={openOpportunity} />
        <Benefits />
        <AboutHao />
        <CtaBand onAction={openAction} onExplore={goToOpportunities} />
      </main>
      <Footer onAction={openAction} />
      <Modal
        open={Boolean(modal)}
        title={modal?.title ?? ''}
        subtitle={modal?.subtitle}
        message={modal?.body ?? ''}
        note={modal?.note}
        onClose={closeModal}
      />
    </>
  )
}
