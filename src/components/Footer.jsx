import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Logo from './Logo'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Opportunities', href: '#opportunities' },
  { label: 'About Hao', href: '#about' },
  { label: 'Why R8', href: '#why-r8' },
]

const agentLinks = [
  { label: 'Join R8 Network', action: 'Join the R8 Network' },
  { label: 'Training & Resources', action: 'Training & Resources' },
  { label: 'FAQ', action: 'FAQ' },
]

export default function Footer({ onAction }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>© 2026 R8 Sales. All rights reserved.</p>
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
          <h2>For Agents</h2>
          <ul>
            {agentLinks.map((link) => (
              <li key={link.label}>
                <button type="button" onClick={() => onAction(link.action)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact Us</h2>
          <ul className="contact-list">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href="tel:+16263892168">(626) 389-2168</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:hao@r8marketing.com">hao@r8marketing.com</a>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              Nationwide
            </li>
          </ul>
          <div className="social-row">
            <button type="button" aria-label="Facebook" onClick={() => onAction('Facebook')}>
              <Facebook size={16} aria-hidden="true" />
            </button>
            <button type="button" aria-label="LinkedIn" onClick={() => onAction('LinkedIn')}>
              <Linkedin size={16} aria-hidden="true" />
            </button>
            <button type="button" aria-label="YouTube" onClick={() => onAction('YouTube')}>
              <Youtube size={16} aria-hidden="true" />
            </button>
          </div>
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
