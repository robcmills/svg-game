import React, { PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import { COS_60, SIN_60 } from 'data/constants'
import styles from './hex.scss'

const Hex = ({ className, radius, style, x, y }) => {
  const adjacent = radius * COS_60
  const opposite = radius * SIN_60
  const points = _.map([
    [radius, 0],
    [adjacent, opposite],
    [-adjacent, opposite],
    [-radius, 0],
    [-adjacent, -opposite],
    [adjacent, -opposite],
  ], (coord) => `${x + coord[0]},${y + coord[1]}`).join(' ')
  return (
    <polygon
      className={classNames(styles.hex, className)}
      points={points}
      style={style}
    />
  )
}

Hex.propTypes = {
  className: PropTypes.string,
  radius: PropTypes.number,
  style: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Hex
