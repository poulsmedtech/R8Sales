import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { opportunities } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'

const navLinks = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Opportunities', href: '#opportunities', id: 'opportunities', hasMenu: true },
  { label: 'About Hao', href: '#about', id: 'about' },
  { label: 'Why R8', href: '#why-r8', id: 'why-r8' },
  { label: 'Join R8', href: '#join', id: 'join' },
]

const DESKTOP_MIN = 1120

export default function Header({ onAction }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOppsOpen, setMobileOppsOpen] = useState(false)
  const [desktopOppsOpen, setDesktopOppsOpen] = useState(false)
  const menuId = useId()
  const desktopOppsId = useId()
  const mobileOppsId = useId()
  const toggleRef = useRef(null)
  const mobileNavRef = useRef(null)
  const desktopOppsRef = useRef(null)
  const desktopDisclosureRef = useRef(null)
  const previousOverflow = useRef('')
  const activeSection = useActiveSection()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= DESKTOP_MIN) {
        setMenuOpen(false)
        setMobileOppsOpen(false)
      } else {
        setDesktopOppsOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    previousOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = () =>
      mobileNavRef.current
        ? [...mobileNavRef.current.querySelectorAll('a, button')].filter((el) => !el.hasAttribute('disabled'))
        : []

    const frame = requestAnimationFrame(() => {
      focusable()[0]?.focus()
    })

    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        setMobileOppsOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow.current
    }
  }, [menuOpen])

  useEffect(() => {
    function onPointer(event) {
      if (!desktopOppsRef.current?.contains(event.target)) {
        setDesktopOppsOpen(false)
      }
    }

    function onKey(event) {
      if (event.key === 'Escape' && desktopOppsOpen) {
        event.preventDefault()
        setDesktopOppsOpen(false)
        desktopDisclosureRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [desktopOppsOpen])

  function closeMenu() {
    setMenuOpen(false)
    setMobileOppsOpen(false)
  }

  function isActive(id) {
    return activeSection === id
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div
                className={`nav-item has-menu${desktopOppsOpen ? ' is-open' : ''}`}
                key={link.href}
                ref={desktopOppsRef}
                onMouseEnter={() => setDesktopOppsOpen(true)}
                onMouseLeave={() => setDesktopOppsOpen(false)}
              >
                <a
                  href={link.href}
                  className={isActive(link.id) ? 'is-active' : undefined}
                  aria-current={isActive(link.id) ? 'true' : undefined}
                >
                  {link.label}
                </a>
                <button
                  type="button"
                  className="nav-disclosure"
                  ref={desktopDisclosureRef}
                  aria-expanded={desktopOppsOpen}
                  aria-controls={desktopOppsId}
                  onClick={() => setDesktopOppsOpen((open) => !open)}
                >
                  <ChevronDown size={14} aria-hidden="true" />
                  <span className="sr-only">Show opportunities</span>
                </button>
                <ul className="nav-dropdown" id={desktopOppsId} hidden={!desktopOppsOpen}>
                  {opportunities.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} onClick={() => setDesktopOppsOpen(false)}>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a
                href={link.href}
                key={link.href}
                className={isActive(link.id) ? 'is-active' : undefined}
                aria-current={isActive(link.id) ? 'true' : undefined}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="header-actions">
          <button type="button" className="btn btn-navy btn-compact" onClick={() => onAction('Contact Us')}>
            Contact Us
          </button>
          <button
            type="button"
            className="menu-toggle"
            ref={toggleRef}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        id={menuId}
        hidden={!menuOpen}
        ref={mobileNavRef}
      >
        <nav aria-label="Mobile">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div key={link.href}>
                <div className="mobile-opps-row">
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                  <button
                    type="button"
                    className="mobile-accordion"
                    aria-expanded={mobileOppsOpen}
                    aria-controls={mobileOppsId}
                    onClick={() => setMobileOppsOpen((open) => !open)}
                  >
                    <ChevronDown size={16} aria-hidden="true" />
                    <span className="sr-only">Show opportunity list</span>
                  </button>
                </div>
                <div className="mobile-subnav" id={mobileOppsId} hidden={!mobileOppsOpen}>
                  {opportunities.map((item) => (
                    <a href={`#${item.id}`} onClick={closeMenu} key={item.id}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a href={link.href} onClick={closeMenu} key={link.href}>
                {link.label}
              </a>
            ),
          )}
          <button
            type="button"
            className="btn btn-navy"
            onClick={() => {
              closeMenu()
              onAction('Contact Us')
            }}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  )
}
