import React, { Component } from 'react'
import styled from 'styled-components'

const Link = styled.a`
  text-decoration: none;
  color: #aaa;
  font-size: 14px;
  &:hover {
    color: red;
  }
`

class DeleteLink extends Component {
  render() {
    return (
      <Link {...this.props}>✕</Link>
    )
  }
}



export default DeleteLink
