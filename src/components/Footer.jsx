import { Mail, Phone } from 'lucide-react'
import Logo from './Logo'
import { contactDetails } from '../data/content'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Why R8', href: '#why-r8' },
  { label: 'Opportunities', href: '#opportunities' },
  { label: 'About Hao', href: '#about' },
]

export default function Footer({ onAction }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>© 2026 R8 Sales Group. All rights reserved.</p>
        </div>

        <div>
          <h2>Quick Links</h2>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact Us</h2>
          <ul className="contact-list">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={contactDetails.phoneHref}>{contactDetails.phoneDisplay}</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={contactDetails.emailHref}>{contactDetails.emailDisplay}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-legal">
        <button type="button" onClick={() => onAction('Privacy Policy')}>
          Privacy Policy
        </button>
        <span aria-hidden="true">|</span>
        <button type="button" onClick={() => onAction('Terms of Use')}>
          Terms of Use
        </button>
      </div>
    </footer>
  )
}
