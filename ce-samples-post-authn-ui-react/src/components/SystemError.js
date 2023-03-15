import React from "react"
import DebugObject from "../components/DebugObject"

class SystemError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {  return { hasError: true }; }

  componentDidCatch(error, errorInfo) { console.log(`SystemError: ${error} ----- ${errorInfo}`); }

  render() {
    if (this.state.hasError || this.props.errorObj?.code) { return (
      <>
        <div className="card error">
          <p>An unexpected error occurred.</p>
          <p>Please contact support.</p>
        </div>
        <DebugObject name="UserError Object" data={this.props.errorObj}/>
      </>
      )
    }
    return this.props.children;
  }
}
export default SystemError
