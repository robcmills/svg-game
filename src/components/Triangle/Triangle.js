import React, { PropTypes } from 'react'
import _ from 'lodash'

import { COS_60, SIN_60 } from 'data/constants'

const Triangle = ({ className, fill, stroke, strokeWidth, r, x, y }) => {
  const adjacent = r * COS_60
  const opposite = r * SIN_60
  const points = _.map([
    [opposite, adjacent],
    [0, -r],
    [-opposite, adjacent],
  ], (coord) => `${x + coord[0]},${y + coord[1]}`).join(' ')
  return (
    <polygon
      className={className}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      points={points}
    />
  )
}

Triangle.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  r: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Triangle
