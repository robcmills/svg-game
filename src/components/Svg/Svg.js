import React, { PropTypes } from 'react'

import styles from './svg.scss'

const Svg = ({ children, height, viewBox, width }) => {
  return (
    <svg
      className={styles.root}
      height={height}
      viewBox={viewBox}
      width={width}>
      {children}
    </svg>
  )
}

Svg.propTypes = {
  children: PropTypes.object,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  width: PropTypes.number,
}

export default Svg
