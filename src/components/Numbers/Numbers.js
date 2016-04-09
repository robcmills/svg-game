import React, { PropTypes } from 'react'
import _ from 'lodash'

import { HEX_RADIUS, SIN_60 } from 'data/constants'
import styles from './numbers.scss'

export const FONT_SIZE = HEX_RADIUS / 2

const Numbers = ({ data, x, y }) => {
  return (
    <g>
      {
        _.map(data, (rowData, yIndex) => {
          return _.map(rowData, (hexType, xIndex) => {
            const isEvenRow = yIndex % 2 === 0
            const destX = HEX_RADIUS * 3 * xIndex + (isEvenRow ? 0 : HEX_RADIUS * 1.5) + x
            const destY = SIN_60 * HEX_RADIUS * yIndex + y
            return (
              <g>
                <circle
                  className={styles.circle}
                  r={HEX_RADIUS * 2 / 3}
                  cx={destX}
                  cy={destY}
                />
                <text
                  className={styles.text}
                  fontSize={FONT_SIZE}
                  textAnchor='middle'
                  x={destX}
                  y={destY + FONT_SIZE / 2 - 2}
                >
                  {`${yIndex},${xIndex}`}
                </text>
              </g>
            )
          })
        })
      }
    </g>
  )
}

Numbers.propTypes = {
  data: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Numbers
