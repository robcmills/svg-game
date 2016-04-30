import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SHAPE_RADIUS, SHAPE_STROKE_WIDTH } from 'data/constants'
import { indexToCoord } from 'utils/hex'
import { colorLuminance } from 'utils/color'

const Elements = ({
  blackElements,
  elements,
  onElementClick,
  selectedShape,
  x,
  y,
  whiteElements,
}) => {
  return (
    <g>
      {
        _.map(elements, (element, i) => {
          const { color, xIndex, yIndex } = element
          const { xCoord, yCoord } = indexToCoord({ xIndex, yIndex })
          const cx = x + xCoord
          const cy = y + yCoord
          return (
            <g key={i} onClick={() => onElementClick({ element })}>
              <circle
                fill={color}
                stroke={colorLuminance(color, -0.2)}
                strokeWidth={SHAPE_STROKE_WIDTH}
                r={SHAPE_RADIUS / 2 + 1}
                cx={cx}
                cy={cy}
              />
            </g>
          )
        })
      }
    </g>
  )
}

Elements.propTypes = {
  blackElements: PropTypes.array,
  elements: PropTypes.array,
  onElementClick: PropTypes.func.isRequired,
  selectedShape: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  whiteElements: PropTypes.array,
}

export default Elements
