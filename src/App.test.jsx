import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const OLD_BRAND = /R8 Sales(?! Group)|R8 SALES(?! GROUP)/

function renderApp() {
  return render(<App />)
}

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

test('opens an opportunity card into the matching program modal', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.click(screen.getByRole('button', { name: 'Learn more about Wave Energy' }))

  const dialog = screen.getByRole('dialog', { name: 'Wave Energy' })
  expect(within(dialog).getByText('A New Choice for Natural Gas')).toBeInTheDocument()
  expect(within(dialog).getByText(/switch their natural gas supplier/i)).toBeInTheDocument()
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
