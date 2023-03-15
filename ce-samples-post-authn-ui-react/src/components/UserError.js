import React from "react"
import DebugObject from "../components/DebugObject"
import abortAuthentication from "../bff/abortAuthentication"

class UserError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {  return { hasError: true }; }

  componentDidCatch(error, errorInfo) { console.log(`UserError: ${error} ----- ${errorInfo}`); }

  render() {
    if (this.state.hasError || this.props.errorObj?.code) {

    // TThe abortAuthentication destroys the current user session in ACP.
    // NOTE: If React paints the page a 2nd time, it will display a System Error due to the ACP session no longer exists.
    abortAuthentication( 422, this.props.errorObj.error, this.props.errorObj.action, this.props.loginId, this.props.loginState, this.props.setSystemError )

    return (
      <>
        <div className="card message">
          <p>{this.props.errorObj.error}</p>
          <p>{this.props.errorObj.action}</p>
        </div>
        <DebugObject name="UserError Object" data={this.props.errorObj}/>
      </>
      )
    }
    return this.props.children;
  }
}
export default UserError
