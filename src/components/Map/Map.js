import React, { PropTypes } from 'react'
import _ from 'lodash'

import { HEX_RADIUS, SIN_60 } from 'data/constants'
import { Hex } from 'components'
// import hexStyles from 'styles/hex-styles.scss'

const Map = ({ hexes, onHexClick, x, y }) => {
  return (
    <g>
      {
        _.map(hexes, (row, yIndex) => (
          _.map(row, (hex, xIndex) => {
            const isEvenRow = yIndex % 2 === 0
            const { color } = hex
            return (
              <Hex
                fill={color}
                onClick={() => onHexClick({ hex })}
                radius={HEX_RADIUS}
                x={HEX_RADIUS * 3 * xIndex + (isEvenRow ? 0 : HEX_RADIUS * 1.5) + x}
                y={SIN_60 * HEX_RADIUS * yIndex + y}
              />
            )
          })
        ))
      }
    </g>
  )
}

Map.propTypes = {
  hexes: PropTypes.array,
  onHexClick: PropTypes.func.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default Map
