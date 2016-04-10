import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SHAPE_RADIUS, SHAPE_STROKE_WIDTH } from 'data/constants'
import { xIndexToX, yIndexToY } from 'utils/hex'
import styles from './shapes.scss'

const Shapes = ({ data, x, y }) => {
  return (
    <g>
      {
        _.map(data, ({ color, shape, xIndex, yIndex }, i) => {
          const isEvenRow = yIndex % 2 === 0
          return (
            <circle
              className={styles.shape}
              fill={color}
              key={i}
              stroke={color === 'white' ? 'black' : 'white'}
              strokeWidth={SHAPE_STROKE_WIDTH}
              r={SHAPE_RADIUS}
              cx={xIndexToX({ xIndex, isEvenRow }) + x}
              cy={yIndexToY({ yIndex }) + y}
            />
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
