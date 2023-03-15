import React from "react"

class LoadingMessage extends React.Component {

  render() {
    if (this.props.systemLoading) { return (
        <div className='loading'>Loading...</div>
      )
    }
    return this.props.children;
  }
}

export default LoadingMessage
