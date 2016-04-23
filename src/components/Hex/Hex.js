import React, { PropTypes } from 'react'
import _ from 'lodash'

import { COS_60, SIN_60 } from 'data/constants'

const Hex = ({ fill, onClick, radius, stroke, strokeWidth, style, x, y }) => {
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
      fill={fill}
      onClick={onClick}
      points={points}
      stroke={stroke}
      strokeWidth={strokeWidth}
      style={style}
    />
  )
}

Hex.propTypes = {
  fill: PropTypes.string,
  onClick: PropTypes.func,
  radius: PropTypes.number,
  stroke: PropTypes.number,
  strokeWidth: PropTypes.number,
  style: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Hex
