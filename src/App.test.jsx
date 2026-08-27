import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { opportunities } from './data/content'

const OLD_BRAND = /R8 Sales(?! Group)|R8 SALES(?! GROUP)/

const PROGRAM_TITLES = [
  'SoCal Gas',
  'Community Solar',
  'Community Health Worker Program',
  'BridgeLink360',
  'Lifeline',
  'Mobile Health Testing',
  'Customer Rewards',
  'New Opportunities',
]

function renderApp() {
  return render(<App />)
}

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

test('renders the R8 Sales Group brand and omits the old standalone name', () => {
  const { container } = renderApp()

  expect(screen.getAllByLabelText('R8 Sales Group home').length).toBeGreaterThan(0)
  expect(screen.getByText(/© 2026 R8 Sales Group/)).toBeInTheDocument()
  expect(screen.getByText(/R8 Sales Group brings together proven sales leadership/)).toBeInTheDocument()
  expect(container.innerHTML).not.toMatch(OLD_BRAND)
})

test('keeps Agent Login off the public site', () => {
  renderApp()

  expect(screen.queryByText(/agent login/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /agent login/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('link', { name: /agent login/i })).not.toBeInTheDocument()
})

test('opens Contact Us with Call and Email actions that match the footer details', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getAllByRole('button', { name: 'Contact Us' })[0])

  const dialog = screen.getByRole('dialog', { name: 'Contact Us' })
  expect(within(dialog).getByText(/Call or email R8 Sales Group directly/i)).toBeInTheDocument()
  expect(within(dialog).getByRole('link', { name: '(626) 888-0845' })).toHaveAttribute(
    'href',
    'tel:+16268880845',
  )
  expect(within(dialog).getByRole('link', { name: 'hao@r8salesgroup.com' })).toHaveAttribute(
    'href',
    'mailto:hao@r8salesgroup.com',
  )
  expect(within(dialog).getByRole('link', { name: 'Call' })).toHaveAttribute('href', 'tel:+16268880845')
  expect(within(dialog).getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:hao@r8salesgroup.com',
  )
  expect(dialog.textContent).not.toContain('hao@r8marketing.com')
})

test('renders the eight revised program titles in order and omits retired names', () => {
  renderApp()

  const cards = screen.getAllByRole('button', { name: /Learn more about/ })
  expect(cards.map((card) => card.getAttribute('aria-label'))).toEqual(
    PROGRAM_TITLES.map((title) => `Learn more about ${title}`),
  )
  expect(screen.queryByText('Wave Energy')).not.toBeInTheDocument()
  expect(screen.queryByText('Medi-Cal Health Education')).not.toBeInTheDocument()
  expect(screen.queryByText('Bridge Link')).not.toBeInTheDocument()
  expect(screen.queryByText('Customer Rewards & Travel Incentives')).not.toBeInTheDocument()
})

test('opens SoCal Gas with all three approved paragraphs', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about SoCal Gas' }))

  const dialog = screen.getByRole('dialog', { name: 'SoCal Gas' })
  const body = dialog.querySelector('.modal-body')
  expect(body).toBeTruthy()
  expect(within(dialog).getByText(/Southern California natural gas market/)).toBeInTheDocument()
  expect(within(dialog).getByText(/homeowners and renters alike/)).toBeInTheDocument()
  expect(within(dialog).getByText(/earn up to \$1,000 per day/)).toBeInTheDocument()
  expect(within(dialog).queryByText(/coming soon/i)).not.toBeInTheDocument()
})

test('opens Community Solar with the approved $450 commission statement', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about Community Solar' }))

  const dialog = screen.getByRole('dialog', { name: 'Community Solar' })
  expect(within(dialog).getByText(/lower their electricity costs/)).toBeInTheDocument()
  expect(within(dialog).getByText(/guaranteed minimum 10% savings/)).toBeInTheDocument()
  expect(within(dialog).getByText(/community solar farm/)).toBeInTheDocument()
  expect(within(dialog).getByText(/approximately \$450 per completed sale/)).toBeInTheDocument()
})

test('opens Community Health Worker Program with its approved copy', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about Community Health Worker Program' }))

  const dialog = screen.getByRole('dialog', { name: 'Community Health Worker Program' })
  expect(within(dialog).getByText(/additional source of income/)).toBeInTheDocument()
  expect(within(dialog).getByText(/certified as Community Health Workers/)).toBeInTheDocument()
  expect(within(dialog).getByText(/large Medi-Cal populations/)).toBeInTheDocument()
  expect(within(dialog).getByText(/getting paid for the work you perform/)).toBeInTheDocument()
})

test('renders BridgeLink360 with exact capitalization everywhere', async () => {
  const user = userEvent.setup()
  const { container } = renderApp()

  expect(container.textContent.match(/BridgeLink360/g)?.length).toBeGreaterThan(1)
  expect(container.textContent).not.toMatch(/Bridge Link|BridgeLink(?!360)|Bridgelink360/)

  await user.click(screen.getByRole('button', { name: 'Learn more about BridgeLink360' }))
  expect(within(screen.getByRole('dialog')).getByRole('heading', { name: 'BridgeLink360' })).toBeInTheDocument()
  expect(within(screen.getByRole('dialog')).getByText(/referring friends, family members and customers/)).toBeInTheDocument()
})

test('opens Mobile Health Testing with the approved test list', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about Mobile Health Testing' }))

  const dialog = screen.getByRole('dialog', { name: 'Mobile Health Testing' })
  expect(within(dialog).getByText(/UTIs, STIs, COVID, RSV, flu/)).toBeInTheDocument()
  expect(within(dialog).getByText(/Respiratory Pathogen Panels \(RPP\)/)).toBeInTheDocument()
})

test('opens Customer Rewards with the approved travel examples', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about Customer Rewards' }))

  const dialog = screen.getByRole('dialog', { name: 'Customer Rewards' })
  expect(within(dialog).getByText(/free airfare, free cruises, free hotel stays or free vacation packages/)).toBeInTheDocument()
})

test('opens New Opportunities with the initial programs wording', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about New Opportunities' }))

  const dialog = screen.getByRole('dialog', { name: 'New Opportunities' })
  expect(within(dialog).getByText(/our initial programs are only the beginning/)).toBeInTheDocument()
  expect(dialog.textContent).not.toMatch(/our initial eight programs/)
})

test('shows TruConnect history as 140,000 subscribers', () => {
  renderApp()

  expect(screen.getByText(/Joined as VP of Sales with 140,000 subscribers/)).toBeInTheDocument()
  expect(screen.queryByText(/with 40,000 subscribers/)).not.toBeInTheDocument()
})

test('maps legacy opportunity hashes to the new cards without opening a modal', () => {
  renderApp()

  const legacy = {
    'wave-energy': 'socal-gas',
    'medi-cal': 'community-health-worker-program',
    'bridge-link': 'bridgelink360',
    'mobile-health': 'mobile-health-testing',
    rewards: 'customer-rewards',
  }

  for (const [from, to] of Object.entries(legacy)) {
    window.location.hash = `#${from}`
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    expect(window.location.hash).toBe(`#${to}`)
    expect(document.getElementById(to)).toHaveFocus()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  }
})

test('keeps long modal copy in a scrollable region', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about Customer Rewards' }))

  const dialog = screen.getByRole('dialog', { name: 'Customer Rewards' })
  const body = dialog.querySelector('.modal-body')
  expect(body).toBeTruthy()
  expect(body.querySelectorAll('p').length).toBe(opportunities.find((item) => item.id === 'customer-rewards').details.length)
  expect(within(dialog).getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  expect(within(dialog).getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('closes a modal with Escape and restores focus', async () => {
  const user = userEvent.setup()
  renderApp()

  const contactButton = screen.getAllByRole('button', { name: 'Contact Us' })[0]
  contactButton.focus()
  await user.click(contactButton)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  await user.keyboard('{Escape}')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(contactButton).toHaveFocus()
})

test('Explore Our Opportunities navigates in page instead of opening a modal', async () => {
  const user = userEvent.setup()
  const scrollIntoView = vi.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView

  renderApp()

  await user.click(screen.getByRole('button', { name: /explore our opportunities/i }))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(scrollIntoView).toHaveBeenCalled()
  expect(document.getElementById('opportunities')).toHaveFocus()
})

test('renders primary navigation in the requested order and keeps the founder video as a placeholder', () => {
  renderApp()

  const desktopNav = document.querySelector('.desktop-nav')
  const desktopLabels = [...desktopNav.querySelectorAll(':scope > a, :scope > .nav-item > a')].map(
    (link) => link.textContent.trim(),
  )
  expect(desktopLabels).toEqual(['Home', 'Why R8', 'Opportunities', 'About Hao', 'Join R8'])

  const mobileNav = document.querySelector('.mobile-nav nav')
  const mobileLabels = [...mobileNav.querySelectorAll(':scope > a, :scope > div > .mobile-opps-row > a')].map(
    (link) => link.textContent.trim(),
  )
  expect(mobileLabels).toEqual(['Home', 'Why R8', 'Opportunities', 'About Hao', 'Join R8'])

  expect(screen.getByText('Founder video coming soon')).toBeInTheDocument()
  expect(screen.queryByText('Founder portrait coming soon')).not.toBeInTheDocument()
})

test('keeps the Opportunities disclosure and program deep links', () => {
  renderApp()

  const disclosure = screen.getByRole('button', { name: 'Show opportunities' })
  fireEvent.click(disclosure)

  expect(disclosure).toHaveAttribute('aria-expanded', 'true')
  const dropdown = document.querySelector('.nav-dropdown')
  expect(dropdown).not.toHaveAttribute('hidden')
  expect([...dropdown.querySelectorAll('a')].map((link) => link.textContent.trim())).toEqual(PROGRAM_TITLES)
})

test('renders the generated founder portrait in About Hao', () => {
  renderApp()

  const portrait = screen.getByRole('img', {
    name: 'Professional portrait of Hao Zhang, founder of R8 Sales Group',
  })
  expect(portrait).toHaveAttribute('src', '/images/hao-zhang-founder.webp')
})

test('uses the new email and omits Nationwide and social controls', () => {
  const { container } = renderApp()

  expect(screen.getAllByRole('link', { name: 'hao@r8salesgroup.com' }).length).toBeGreaterThan(0)
  expect(screen.getByRole('link', { name: 'hao@r8salesgroup.com' })).toHaveAttribute(
    'href',
    'mailto:hao@r8salesgroup.com',
  )
  expect(container.textContent).not.toContain('hao@r8marketing.com')
  expect(screen.queryByText('Nationwide')).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Facebook' })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'LinkedIn' })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'YouTube' })).not.toBeInTheDocument()
})

test('source metadata and package files use R8 Sales Group and the production domain', () => {
  const html = readFileSync(resolve('index.html'), 'utf8')
  const pkg = readFileSync(resolve('package.json'), 'utf8')
  const favicon = readFileSync(resolve('public/favicon.svg'), 'utf8')
  const robots = readFileSync(resolve('public/robots.txt'), 'utf8')
  const sitemap = readFileSync(resolve('public/sitemap.xml'), 'utf8')

  expect(html).toContain('<title>R8 Sales Group | Right Opportunities. Right People.</title>')
  expect(html).toContain('content="R8 Sales Group | Right Opportunities. Right People."')
  expect(html).toContain('"name": "R8 Sales Group"')
  expect(html).toContain('href="https://r8salesgroup.com/"')
  expect(html).toContain('content="https://r8salesgroup.com/"')
  expect(html).toContain('content="https://r8salesgroup.com/og-image.jpg"')
  expect(html).toContain('"url": "https://r8salesgroup.com/"')
  expect(html).toContain('hao@r8salesgroup.com')
  expect(html).toContain('"telephone": "+1-626-888-0845"')
  expect(html).not.toContain('hao@r8marketing.com')
  expect(html).not.toContain('(626) 389-2168')
  expect(html).not.toContain('+1-626-389-2168')
  expect(html).not.toMatch(OLD_BRAND)
  expect(pkg).toContain('"name": "r8-sales-group"')
  expect(favicon).toContain('aria-label="R8 Sales Group"')
  expect(robots).toContain('Sitemap: https://r8salesgroup.com/sitemap.xml')
  expect(sitemap).toContain('<loc>https://r8salesgroup.com/</loc>')
})

test('opportunity popups keep approved copy and never show Coming Soon', async () => {
  const user = userEvent.setup()
  renderApp()

  for (const item of opportunities) {
    await user.click(screen.getByRole('button', { name: `Learn more about ${item.title}` }))

    const dialog = screen.getByRole('dialog', { name: item.title })
    expect(within(dialog).queryByText(/coming soon/i)).not.toBeInTheDocument()
    expect(dialog.querySelector(`.icon-badge.tone-${item.tone}`)).toBeTruthy()
    expect(dialog.querySelector('.modal-body').querySelectorAll('p')).toHaveLength(item.details.length)
    item.details.forEach((paragraph) => {
      expect(within(dialog).getByText(paragraph)).toBeInTheDocument()
    })

    await user.click(within(dialog).getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  }
})

test('Coming soon appears only on the founder video experience', async () => {
  const user = userEvent.setup()
  const { container } = renderApp()

  expect(screen.getByText('Founder video coming soon')).toBeInTheDocument()
  expect(container.textContent.match(/coming soon/gi)).toEqual(['coming soon'])

  await user.click(screen.getByRole('button', { name: 'Watch Video Message' }))
  const dialog = screen.getByRole('dialog', { name: 'Watch Video Message' })
  expect(within(dialog).getByText('Coming soon')).toBeInTheDocument()
  expect(within(dialog).queryByRole('img')).not.toBeInTheDocument()
})

test('closes a modal from the backdrop and restores focus', async () => {
  const user = userEvent.setup()
  renderApp()

  const contactButton = screen.getAllByRole('button', { name: 'Contact Us' })[0]
  contactButton.focus()
  await user.click(contactButton)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  fireEvent.click(document.querySelector('.modal-backdrop'))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(contactButton).toHaveFocus()
})

test('uses equal-height About Hao columns on desktop', () => {
  renderApp()

  const aboutGrid = document.querySelector('.about-grid')
  const portrait = document.querySelector('.about-photo')
  const audience = document.querySelector('.audience-panel')

  expect(aboutGrid).toBeTruthy()
  expect(portrait).toBeTruthy()
  expect(audience).toBeTruthy()
  expect(aboutGrid.contains(portrait)).toBe(true)
  expect(aboutGrid.contains(audience)).toBe(true)
  expect(aboutGrid.contains(document.querySelector('.about-copy'))).toBe(true)
})

test('shows the updated phone number and omits the retired number', () => {
  const { container } = renderApp()

  const phoneLinks = screen.getAllByRole('link', { name: '(626) 888-0845' })
  expect(phoneLinks.length).toBeGreaterThan(0)
  phoneLinks.forEach((link) => {
    expect(link).toHaveAttribute('href', 'tel:+16268880845')
  })
  expect(container.textContent).not.toContain('(626) 389-2168')
  expect(container.innerHTML).not.toContain('16263892168')
  expect(container.innerHTML).not.toContain('6263892168')
})

test('rebuilds the footer without agent-resource links', () => {
  renderApp()

  const footer = document.querySelector('.site-footer')
  const quickLinks = within(footer).getByRole('heading', { name: 'Quick Links' }).parentElement
  expect([...quickLinks.querySelectorAll('a')].map((link) => link.textContent.trim())).toEqual([
    'Home',
    'Why R8',
    'Opportunities',
    'About Hao',
  ])
  expect(within(footer).queryByRole('heading', { name: 'For Agents' })).not.toBeInTheDocument()
  expect(within(footer).queryByRole('button', { name: 'Training & Resources' })).not.toBeInTheDocument()
  expect(within(footer).queryByRole('button', { name: 'FAQ' })).not.toBeInTheDocument()
  expect(within(footer).queryByText('Join R8 Network')).not.toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: 'Join R8' }).length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: 'Join the R8 Network' })).toBeInTheDocument()
})
