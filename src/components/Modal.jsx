import { useEffect, useId, useRef } from 'react'
import { Mail, Phone, X } from 'lucide-react'

export default function Modal({
  open,
  title,
  subtitle,
  message,
  note,
  paragraphs,
  eyebrow = 'Coming soon',
  contacts,
  onClose,
}) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocus = useRef(null)
  const scrollY = useRef(0)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!open) return undefined

    previousFocus.current = document.activeElement
    scrollY.current = window.scrollY
    const frame = requestAnimationFrame(() => closeRef.current?.focus())

    function getFocusable() {
      if (!dialogRef.current) return []
      return [...dialogRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
        (el) => !el.hasAttribute('disabled'),
      )
    }

    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    const previousPosition = document.body.style.position
    const previousTop = document.body.style.top
    const previousWidth = document.body.style.width
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY.current}px`
    document.body.style.width = '100%'

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      document.body.style.position = previousPosition
      document.body.style.top = previousTop
      document.body.style.width = previousWidth
      window.scrollTo(0, scrollY.current)
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus()
      }
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close dialog"
          >
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
        </div>
        <div id={descId} className="modal-body">
          {subtitle ? <p className="modal-subtitle">{subtitle}</p> : null}
          {Array.isArray(paragraphs)
            ? paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            : null}
          {message ? <p>{message}</p> : null}
          {contacts ? (
            <div className="contact-panel">
              <ul className="contact-panel-list">
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href={contacts.phone.href}>{contacts.phone.display}</a>
                </li>
                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a href={contacts.email.href}>{contacts.email.display}</a>
                </li>
              </ul>
              <div className="contact-panel-actions">
                <a className="btn btn-primary" href={contacts.phone.href}>
                  <Phone size={15} aria-hidden="true" />
                  Call
                </a>
                <a className="btn btn-navy" href={contacts.email.href}>
                  <Mail size={15} aria-hidden="true" />
                  Email
                </a>
              </div>
            </div>
          ) : null}
          {note ? <p className="modal-note">{note}</p> : null}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
