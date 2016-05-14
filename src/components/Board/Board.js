import React, { PropTypes } from 'react'

import { Elements, Hexes, Numbers, Shapes, Svg, ValidMoves } from 'components'

const Board = ({
  blackElements,
  elements,
  handleElementClick,
  handleHexClick,
  handleShapeClick,
  handleValidMoveClick,
  board,
  selectedShape,
  shapes,
  showNumbers,
  validMoves,
  whiteElements,
}) => {
  return (
    <Svg viewBox={`0, 0, ${board.width}, ${board.height}`}>
      <g>
        <Hexes
          blackElements={blackElements}
          hexes={board.hexes}
          onHexClick={handleHexClick}
          x={board.offset}
          y={board.offset}
          whiteElements={whiteElements}
        />
        <Shapes
          shapes={shapes}
          onShapeClick={handleShapeClick}
          selectedShape={selectedShape}
          x={board.offset}
          y={board.offset}
        />
        <Elements
          blackElements={blackElements}
          elements={elements}
          onElementClick={handleElementClick}
          selectedShape={selectedShape}
          x={board.offset}
          y={board.offset}
          whiteElements={whiteElements}
        />
        <ValidMoves
          onValidMoveClick={handleValidMoveClick}
          moves={validMoves}
          x={board.offset}
          y={board.offset}
        />
        {showNumbers && <Numbers data={board.hexes} x={board.offset} y={board.offset} />}
      </g>
    </Svg>
  )
}

Board.propTypes = {
  blackElements: PropTypes.array.isRequired,
  elements: PropTypes.array.isRequired,
  handleElementClick: PropTypes.func.isRequired,
  handleHexClick: PropTypes.func.isRequired,
  handleShapeClick: PropTypes.func.isRequired,
  handleValidMoveClick: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  selectedShape: PropTypes.object,
  shapes: PropTypes.array.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  validMoves: PropTypes.array.isRequired,
  whiteElements: PropTypes.array.isRequired,
}

export default Board
