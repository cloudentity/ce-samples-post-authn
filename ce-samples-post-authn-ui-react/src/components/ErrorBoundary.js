import React from "react"
import PageHeader from "../components/PageHeader"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {  return { hasError: true }; }

  componentDidCatch(error, errorInfo) { console.log(`ErrorBoundary: ${error} ----- ${errorInfo}`); }

  render() {
    if (this.state.hasError) { return (
      <>
        <PageHeader />
        <div className="card error">
          <p>An unexpected error occurred.</p>
          <p>Please contact support.</p>
        </div>
      </>
      )
    }
    return this.props.children;
  }
}
export default ErrorBoundary
