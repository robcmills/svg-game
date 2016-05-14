import React, { PropTypes } from 'react'

import { Elements, Hexes, Numbers, Shapes, Svg, ValidMoves } from 'components'

const Board = ({
  blackElements,
  elements,
  handleElementClick,
  handleHexClick,
  handleShapeClick,
  handleValidMoveClick,
  map,
  selectedShape,
  shapes,
  showNumbers,
  validMoves,
  whiteElements,
}) => {
  return (
    <Svg viewBox={`0, 0, ${map.width}, ${map.height}`}>
      <g>
        <Hexes
          blackElements={blackElements}
          hexes={map.hexes}
          onHexClick={handleHexClick}
          x={map.offset}
          y={map.offset}
          whiteElements={whiteElements}
        />
        <Shapes
          shapes={shapes}
          onShapeClick={handleShapeClick}
          selectedShape={selectedShape}
          x={map.offset}
          y={map.offset}
        />
        <Elements
          blackElements={blackElements}
          elements={elements}
          onElementClick={handleElementClick}
          selectedShape={selectedShape}
          x={map.offset}
          y={map.offset}
          whiteElements={whiteElements}
        />
        <ValidMoves
          onValidMoveClick={handleValidMoveClick}
          moves={validMoves}
          x={map.offset}
          y={map.offset}
        />
        {showNumbers && <Numbers data={map.hexes} x={map.offset} y={map.offset} />}
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
  map: PropTypes.object.isRequired,
  selectedShape: PropTypes.object,
  shapes: PropTypes.array.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  validMoves: PropTypes.array.isRequired,
  whiteElements: PropTypes.array.isRequired,
}

export default Board
