import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import styles from './svg.scss'

class Svg extends Component {
  static propTypes = {
    children: PropTypes.object,
    viewBox: PropTypes.string,
  };

  constructor (props) {
    super(props)
    this.state = {
      rootHeight: 0,
      rootWidth: 0,
    }
  }

  render () {
    const { children, viewBox } = this.props
    const { rootHeight, rootWidth } = this.state
    const isPortrait = rootHeight > rootWidth
    const dim = isPortrait ? { width: '100%' } : { height: rootHeight }
    return (
      <div className={styles.root} ref={this._setRef}>
        <svg
          className={styles.svg}
          viewBox={viewBox}
          {...dim}>
          {children}
        </svg>
      </div>
    )
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize)
    _.defer(this._onResize)
  }

  _onResize = () => {
    const boundingRect = this._rootNode.getBoundingClientRect()
    const rootHeight = boundingRect.height || 0
    const rootWidth = boundingRect.width || 0
    this.setState({ rootHeight, rootWidth })
  }

  _setRef = rootNode => {
    this._rootNode = rootNode
  }
}

export default Svg
