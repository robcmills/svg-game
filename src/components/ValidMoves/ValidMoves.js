import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SELECTED_COLOR, SHAPE_RADIUS, HEX_RADIUS, SIN_60 } from 'data/constants'

const ValidMoves = ({ onValidMoveClick, moves, x, y }) => {
  return (
    <g>
      {
        _.map(moves, (move, i) => {
          const { xIndex, yIndex } = move
          const isEvenRow = yIndex % 2 === 0
          const hx = HEX_RADIUS * 3 * xIndex + (isEvenRow ? 0 : HEX_RADIUS * 1.5) + x
          const hy = SIN_60 * HEX_RADIUS * yIndex + y
          return (
            <circle
              fill={SELECTED_COLOR}
              key={i}
              onClick={() => onValidMoveClick({ xIndex, yIndex })}
              r={SHAPE_RADIUS / 2}
              cx={hx}
              cy={hy}
            />
          )
        })
      }
    </g>
  )
}

ValidMoves.propTypes = {
  onValidMoveClick: PropTypes.func.isRequired,
  moves: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
}

ValidMoves.defaultProps = {
  onValidMoveClick: () => undefined,
}

export default ValidMoves
