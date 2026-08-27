import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen, within } from '@testing-library/react'
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
  expect(within(dialog).getByRole('link', { name: '(626) 389-2168' })).toHaveAttribute(
    'href',
    'tel:+16263892168',
  )
  expect(within(dialog).getByRole('link', { name: 'hao@r8marketing.com' })).toHaveAttribute(
    'href',
    'mailto:hao@r8marketing.com',
  )
  expect(within(dialog).getByRole('link', { name: 'Call' })).toHaveAttribute('href', 'tel:+16263892168')
  expect(within(dialog).getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:hao@r8marketing.com',
  )
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

test('renders primary navigation and founder media placeholders', () => {
  renderApp()

  expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0)
  expect(screen.getAllByRole('link', { name: 'Opportunities' }).length).toBeGreaterThan(0)
  expect(screen.getAllByRole('link', { name: 'About Hao' }).length).toBeGreaterThan(0)
  expect(screen.getAllByRole('link', { name: 'Why R8' }).length).toBeGreaterThan(0)
  expect(screen.getAllByRole('link', { name: 'Join R8' }).length).toBeGreaterThan(0)
  expect(screen.getByText('Founder video coming soon')).toBeInTheDocument()
  expect(screen.getByText('Founder portrait coming soon')).toBeInTheDocument()
})

test('source metadata and package files use R8 Sales Group', () => {
  const html = readFileSync(resolve('index.html'), 'utf8')
  const pkg = readFileSync(resolve('package.json'), 'utf8')
  const favicon = readFileSync(resolve('public/favicon.svg'), 'utf8')

  expect(html).toContain('<title>R8 Sales Group | Right Opportunities. Right People.</title>')
  expect(html).toContain('content="R8 Sales Group | Right Opportunities. Right People."')
  expect(html).toContain('"name": "R8 Sales Group"')
  expect(html).not.toMatch(OLD_BRAND)
  expect(pkg).toContain('"name": "r8-sales-group"')
  expect(favicon).toContain('aria-label="R8 Sales Group"')
})
