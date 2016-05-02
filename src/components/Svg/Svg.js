import React, { Component, PropTypes } from 'react'

import styles from './svg.scss'

class Svg extends Component {
  static propTypes = {
    children: PropTypes.object,
    viewBox: PropTypes.string,
  };

  render () {
    const { children, viewBox } = this.props
    // const { height, width } = this.refs.root.getBoundingClientRect()
    return (
      <div className={styles.root} ref='root'>
        <svg
          className={styles.root}
          viewBox={viewBox}>
          {children}
        </svg>
      </div>
    )
  }

  getHeight = () => this.refs.root.getBoundingClientRect().height
  getWidth = () => this.refs.root.getBoundingClientRect().width
}

export default Svg
