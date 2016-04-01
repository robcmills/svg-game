import React, { PropTypes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import styles from './hex.scss'

export const toRad = (deg) => deg * (Math.PI / 180)
export const COS_60 = Math.cos(toRad(60))
export const SIN_60 = Math.sin(toRad(60))

const Hex = ({ className, radius, x, y }) => {
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
    />
  )
}

Hex.propTypes = {
  className: PropTypes.string,
  radius: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Hex
