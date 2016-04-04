/* eslint-disable */
import React, { PropTypes } from 'react'
import _ from 'lodash'

import { Hex } from 'components'
import { SIN_60 } from 'components/Hex/hex'
import { HEX_RADIUS } from 'data/hex-types'
import hexStyles from 'styles/hex-styles.scss'

const Map = ({ data, x, y }) => {
  return (
    <g>
      {
        _.map(data, (rowData, yIndex) => {
          return _.map(rowData, (hexType, xIndex) => {
            const isEvenRow = yIndex % 2 === 0
            return (
              <Hex
                className={hexStyles[hexType]}
                radius={HEX_RADIUS}
                x={HEX_RADIUS * 3 * xIndex + (isEvenRow ? 0 : HEX_RADIUS * 1.5) + x}
                y={SIN_60 * HEX_RADIUS * yIndex + y}
              />
            )
          })
        })
      }
    </g>
  )
}

Map.propTypes = {
  data: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Map
