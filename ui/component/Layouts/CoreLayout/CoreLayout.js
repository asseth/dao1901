// Todo use it or delete

import React, { Component } from 'react'
import './CoreLayout.scss'

// ========================================================
// Global styles
// ========================================================
import '../../theme/app.scss';

import TopBar from '../../TopBar'

export class CoreLayout extends Component {

  componentWillMount () {
    this.props.web3Connect() // check if web3 exists. metamask compatibility
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <TopBar />
        {children}
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  web3Connect: React.PropTypes.func.isRequired
}

export default CoreLayout
