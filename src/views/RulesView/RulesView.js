import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Rules extends Component {
  render () {
    return (
      <div>How to play</div>
    )
  }
}

export default connect()(Rules)
