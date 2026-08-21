import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <p className="eyebrow">R8 Sales Group</p>
          <h1>This page hit a snag.</h1>
          <p>
            Something unexpected went wrong while loading the site. You can try again, or
            reload the page.
          </p>
          <div className="error-actions">
            <button type="button" className="btn btn-primary" onClick={this.handleRetry}>
              Try again
            </button>
            <button type="button" className="btn btn-navy" onClick={this.handleReload}>
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
