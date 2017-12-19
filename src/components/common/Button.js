import React, { Component } from 'react'
const styles = {
  borderRadius: '3px',
  padding: '8px 16px',
  backgroundColor: '#666',
  display: 'inline-block'
}

class Button extends Component {
  render() {
    return (
      <span {...this.props} style={styles}>
        {this.props.children}
      </span>
    )
  }
}

export default Button
