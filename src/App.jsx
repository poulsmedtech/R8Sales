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
import { placeholderMessage } from './data/content'

export default function App() {
  const [modal, setModal] = useState(null)

  const openAction = useCallback((title) => {
    setModal({
      title,
      message: placeholderMessage(title),
    })
  }, [])

  const closeModal = useCallback(() => setModal(null), [])

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Header onAction={openAction} />
      <main>
        <Hero onAction={openAction} />
        <FounderMessage onAction={openAction} />
        <Opportunities onAction={openAction} />
        <Benefits />
        <AboutHao />
        <CtaBand onAction={openAction} />
      </main>
      <Footer onAction={openAction} />
      <Modal
        open={Boolean(modal)}
        title={modal?.title ?? ''}
        message={modal?.message ?? ''}
        onClose={closeModal}
      />
    </>
  )
}
