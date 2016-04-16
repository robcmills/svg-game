import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SHAPE_RADIUS, SHAPE_STROKE_WIDTH } from 'data/constants'
import { xIndexToX, yIndexToY } from 'utils/hex'
import { colorLuminance } from 'utils/color'

const Elements = ({ elements, onElementClick, selectedShape, x, y }) => {
  const blackElements = _.filter(elements, 'ownedBy', 'black')
  const whiteElements = _.filter(elements, 'ownedBy', 'white')
  const freeElements = _.difference(elements, blackElements, whiteElements)
  return (
    <g>
      {
        _.map(freeElements, (element, i) => {
          const { color, xIndex, yIndex } = element
          const isEvenRow = yIndex % 2 === 0
          return (
            <g key={i} onClick={() => onElementClick({ element })}>
              <circle
                fill={color}
                stroke={colorLuminance(color, -0.2)}
                strokeWidth={SHAPE_STROKE_WIDTH}
                r={SHAPE_RADIUS}
                cx={xIndexToX({ xIndex, isEvenRow }) + x}
                cy={yIndexToY({ yIndex }) + y}
              />
            </g>
          )
        })
      }
    </g>
  )
}

Elements.propTypes = {
  elements: PropTypes.array,
  onElementClick: PropTypes.func.isRequired,
  selectedShape: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Elements
