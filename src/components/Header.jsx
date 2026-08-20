import { useEffect, useId, useState } from 'react'
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

export default function Header({ onAction }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [oppsOpen, setOppsOpen] = useState(false)
  const menuId = useId()
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
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
    setOppsOpen(false)
  }

  function isActive(id) {
    return activeSection === id
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo variant="dark" />

        <nav className="desktop-nav" aria-label="Primary">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div className="nav-item has-menu" key={link.href}>
                <a
                  href={link.href}
                  className={isActive(link.id) ? 'is-active' : undefined}
                  aria-current={isActive(link.id) ? 'location' : undefined}
                >
                  {link.label}
                  <ChevronDown size={14} aria-hidden="true" />
                </a>
                <div className="nav-dropdown" role="menu">
                  {opportunities.map((item) => (
                    <a href={`#${item.id}`} role="menuitem" key={item.id}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                href={link.href}
                key={link.href}
                className={isActive(link.id) ? 'is-active' : undefined}
                aria-current={isActive(link.id) ? 'location' : undefined}
              >
                {link.label}
              </a>
            ),
          )}
          <button type="button" className="nav-text-btn" onClick={() => onAction('Agent Login')}>
            Agent Login
          </button>
          <button type="button" className="btn btn-navy btn-compact" onClick={() => onAction('Contact Us')}>
            Contact Us
          </button>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div className={`mobile-nav${menuOpen ? ' is-open' : ''}`} id={menuId} hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div key={link.href}>
                <button
                  type="button"
                  className="mobile-accordion"
                  aria-expanded={oppsOpen}
                  onClick={() => setOppsOpen((open) => !open)}
                >
                  {link.label}
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                {oppsOpen && (
                  <div className="mobile-subnav">
                    <a href="#opportunities" onClick={closeMenu}>
                      View all opportunities
                    </a>
                    {opportunities.map((item) => (
                      <a href={`#${item.id}`} onClick={closeMenu} key={item.id}>
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a href={link.href} onClick={closeMenu} key={link.href}>
                {link.label}
              </a>
            ),
          )}
          <button
            type="button"
            onClick={() => {
              closeMenu()
              onAction('Agent Login')
            }}
          >
            Agent Login
          </button>
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
