import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SHAPE_RADIUS, HEX_RADIUS, SIN_60 } from 'data/constants'
import { Hex } from 'components'

const Hexes = ({ blackElements, hexes, onHexClick, x, y, whiteElements }) => {
  return (
    <g>
      {
        _.map(hexes, (row, yIndex) => (
          _.map(row, (hex, xIndex) => {
            const isEvenRow = yIndex % 2 === 0
            const { color, type } = hex
            let ownedBy
            if (_.find(blackElements, { type })) {
              ownedBy = 'black'
            }
            if (_.find(whiteElements, { type })) {
              ownedBy = 'white'
            }
            const hx = HEX_RADIUS * 3 * xIndex + (isEvenRow ? 0 : HEX_RADIUS * 1.5) + x
            const hy = SIN_60 * HEX_RADIUS * yIndex + y
            return (
              <g>
                <Hex
                  fill={color}
                  onClick={() => onHexClick({ hex })}
                  radius={HEX_RADIUS}
                  x={hx}
                  y={hy}
                />
                {
                  ownedBy &&
                    <circle
                      fill={ownedBy}
                      onClick={() => onHexClick({ hex })}
                      r={SHAPE_RADIUS / 2}
                      cx={hx}
                      cy={hy}
                    />
                }
              </g>
            )
          })
        ))
      }
    </g>
  )
}

Hexes.propTypes = {
  blackElements: PropTypes.array,
  hexes: PropTypes.array,
  onHexClick: PropTypes.func.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  whiteElements: PropTypes.array,
}

Hexes.defaultProps = {
  onHexClick: () => undefined,
}

export default Hexes
