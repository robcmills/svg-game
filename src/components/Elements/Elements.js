import React, { PropTypes } from 'react'
import _ from 'lodash'

import { HEX_RADIUS, SHAPE_RADIUS, SHAPE_STROKE_WIDTH } from 'data/constants'
import { xIndexToX, yIndexToY } from 'utils/hex'
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
      {
        _.map(blackElements, (element, i) => {
          const { color } = element
          const cy = y - HEX_RADIUS
          const totalWidth = HEX_RADIUS * 3 * (blackElements.length - 1)
          const centerX = xIndexToX({ xIndex: 2, isEvenRow: false }) + x
          const cx = centerX - totalWidth / 2 + i * HEX_RADIUS * 3
          return (
            <g key={i}>
              <circle
                fill={color}
                stroke={colorLuminance(color, -0.2)}
                strokeWidth={SHAPE_STROKE_WIDTH}
                r={SHAPE_RADIUS}
                cx={cx}
                cy={cy}
              />
            </g>
          )
        })
      }
      {
        _.map(whiteElements, (element, i) => {
          const { color } = element
          const cy = yIndexToY({ yIndex: 21 }) + y + HEX_RADIUS * 2 // todo
          const totalWidth = HEX_RADIUS * 3 * (whiteElements.length - 1)
          const centerX = xIndexToX({ xIndex: 2, isEvenRow: false }) + x
          const cx = centerX - totalWidth / 2 + i * HEX_RADIUS * 3
          return (
            <g key={i}>
              <circle
                fill={color}
                stroke={colorLuminance(color, -0.2)}
                strokeWidth={SHAPE_STROKE_WIDTH}
                r={SHAPE_RADIUS}
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
