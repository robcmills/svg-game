import React, { PropTypes } from 'react'
import _ from 'lodash'

import { HEX_RADIUS, SIN_60 } from 'data/constants'
import { Hex } from 'components'
import hexStyles from 'styles/hex-styles.scss'

const Map = ({ data, onHexClick, x, y }) => {
  return (
    <g>
      {
        _.map(data, (rowData, yIndex) => {
          return _.map(rowData, (hexType, xIndex) => {
            const isEvenRow = yIndex % 2 === 0
            return (
              <Hex
                className={hexStyles[hexType]}
                onClick={() => onHexClick({ xIndex, yIndex })}
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
  onHexClick: PropTypes.func.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Map
