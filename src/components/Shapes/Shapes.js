import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SELECTED_COLOR, SHAPE_RADIUS, SHAPE_STROKE_WIDTH, SQUARE_DIM } from 'data/constants'
import { xIndexToX, yIndexToY } from 'utils/hex'
import { colorLuminance } from 'utils/color'
import { Triangle } from 'components'
import styles from './shapes.scss'

const Shapes = ({ data, onShapeClick, selectedShape, x, y }) => {
  return (
    <g>
      {
        _.map(data, ({ color, shape, xIndex, yIndex }, i) => {
          const isEvenRow = yIndex % 2 === 0
          let fill = color
          if (
            selectedShape &&
            selectedShape.xIndex === xIndex &&
            selectedShape.yIndex === yIndex
          ) {
            fill = SELECTED_COLOR
          }
          return (
            <g key={i} onClick={() => onShapeClick({ shape, xIndex, yIndex })}>
            {
              shape === 'circle' &&
                <circle
                  className={styles.shape}
                  fill={fill}
                  stroke={color === 'white' ? 'black' : 'white'}
                  strokeWidth={SHAPE_STROKE_WIDTH}
                  r={SHAPE_RADIUS}
                  cx={xIndexToX({ xIndex, isEvenRow }) + x}
                  cy={yIndexToY({ yIndex }) + y}
                />
            }
            {
              shape === 'square' &&
                <rect
                  className={styles.shape}
                  fill={fill}
                  stroke={color === 'white' ? 'black' : 'white'}
                  strokeWidth={SHAPE_STROKE_WIDTH}
                  height={SQUARE_DIM}
                  width={SQUARE_DIM}
                  x={xIndexToX({ xIndex, isEvenRow }) + x - SQUARE_DIM / 2}
                  y={yIndexToY({ yIndex }) + y - SQUARE_DIM / 2}
                />
            }
            {
              shape === 'triangle' &&
                <Triangle
                  className={styles.shape}
                  fill={fill}
                  stroke={color === 'white' ? 'black' : 'white'}
                  strokeWidth={SHAPE_STROKE_WIDTH}
                  r={SHAPE_RADIUS}
                  x={xIndexToX({ xIndex, isEvenRow }) + x}
                  y={yIndexToY({ yIndex }) + y}
                />
            }
            {
              shape === 'element' &&
                <circle
                  fill={color}
                  stroke={colorLuminance(color, -0.2)}
                  strokeWidth={SHAPE_STROKE_WIDTH}
                  r={SHAPE_RADIUS}
                  cx={xIndexToX({ xIndex, isEvenRow }) + x}
                  cy={yIndexToY({ yIndex }) + y}
                />
            }
            </g>
          )
        })
      }
    </g>
  )
}

Shapes.propTypes = {
  data: PropTypes.array,
  onShapeClick: PropTypes.func.isRequired,
  selectedShape: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Shapes
