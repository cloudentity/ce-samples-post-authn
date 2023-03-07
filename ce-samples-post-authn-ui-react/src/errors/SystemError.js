import React from "react"
import Header from "../components/Header"

class SystemError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {  return { hasError: true }; }

  componentDidCatch(error, errorInfo) { console.log(`SystemError: ${error} ----- ${errorInfo}`); }

  render() {
    if (this.state.hasError) { return (
      <>
        <Header />
        <div className="card error">
          <h3>Shut'er down Clancy, She's pumpin' mud!</h3>
          <p>Please contact support.</p>
        </div>
      </>
      )
    }
    return this.props.children;
  }
}
export default SystemError
