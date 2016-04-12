import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SHAPE_RADIUS, SHAPE_STROKE_WIDTH, SQUARE_DIM } from 'data/constants'
import { xIndexToX, yIndexToY } from 'utils/hex'
import { Triangle } from 'components'
import styles from './shapes.scss'

const Shapes = ({ data, x, y }) => {
  return (
    <g>
      {
        _.map(data, ({ color, shape, xIndex, yIndex }, i) => {
          const isEvenRow = yIndex % 2 === 0
          return (
            <g key={i}>
            {
              shape === 'circle' &&
                <circle
                  className={styles.shape}
                  fill={color}
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
                  fill={color}
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
                  fill={color}
                  stroke={color === 'white' ? 'black' : 'white'}
                  strokeWidth={SHAPE_STROKE_WIDTH}
                  r={SHAPE_RADIUS}
                  x={xIndexToX({ xIndex, isEvenRow }) + x}
                  y={yIndexToY({ yIndex }) + y}
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
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Shapes
