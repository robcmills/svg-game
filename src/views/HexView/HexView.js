import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import * as selectors from './hex-view-selectors'
import * as actions from './hex-view-action-creators'
import { Elements, Map, Numbers, Shapes, Svg, ValidMoves } from 'components'
import { elements1, map1, shapes1 } from 'data/maps/map1'
import { HEX_RADIUS } from 'data/constants'
import styles from './hex-view.scss'

class HexView extends React.Component {
  static propTypes = {
    blackElements: PropTypes.array,
    convertShape: PropTypes.func.isRequired,
    elements: PropTypes.array,
    enforceTurnOrder: PropTypes.bool,
    enforceValidMoves: PropTypes.bool,
    fields: PropTypes.object,
    loadElements: PropTypes.func.isRequired,
    loadMap: PropTypes.func.isRequired,
    loadShapes: PropTypes.func.isRequired,
    map: PropTypes.array,
    moveSelectedShape: PropTypes.func.isRequired,
    selectedShape: PropTypes.object,
    selectShape: PropTypes.func.isRequired,
    shapes: PropTypes.array,
    showNumbers: PropTypes.bool,
    toggleNumbers: PropTypes.func.isRequired,
    toggleEnforceTurnOrder: PropTypes.func.isRequired,
    toggleTurn: PropTypes.func.isRequired,
    toggleValidMoves: PropTypes.func.isRequired,
    turn: PropTypes.string,
    unSelectShape: PropTypes.func.isRequired,
    validMoves: PropTypes.array,
    whiteElements: PropTypes.array,
  };

  render () {
    const {
      blackElements,
      elements,
      enforceTurnOrder,
      enforceValidMoves,
      fields: {
        viewBoxHeight,
        viewBoxWidth,
        viewBoxMinX,
        viewBoxMinY,
      },
      map,
      selectedShape,
      shapes,
      showNumbers,
      turn,
      validMoves,
      whiteElements,
    } = this.props
    const viewBox = _.map(
      [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight], 'value'
    )
    const offset = HEX_RADIUS * 2
    return (
      <div className={styles.root}>
        <div className={styles.turn}>
          {enforceTurnOrder && `${turn} to play`}
        </div>
        <div className={styles.svgWrap}>
          <Svg
            height={HEX_RADIUS * 24}
            viewBox={viewBox[0] ? viewBox.join(',') : null}
            width={HEX_RADIUS * 19}>
            <g>
              <Map
                blackElements={blackElements}
                hexes={map}
                onHexClick={this.handleHexClick}
                x={offset}
                y={offset}
                whiteElements={whiteElements}
              />
              <Shapes
                shapes={shapes}
                onShapeClick={this.handleShapeClick}
                selectedShape={selectedShape}
                x={offset}
                y={offset}
              />
              <Elements
                blackElements={blackElements}
                elements={elements}
                onElementClick={this.handleElementClick}
                selectedShape={selectedShape}
                x={offset}
                y={offset}
                whiteElements={whiteElements}
              />
              <ValidMoves
                onValidMoveClick={this.handleValidMoveClick}
                moves={validMoves}
                x={offset}
                y={offset}
              />
              {showNumbers && <Numbers data={map} x={offset} y={offset} />}
            </g>
          </Svg>
        </div>
        <div>
          <a onClick={this.handleToggleEnforceTurnOrderClick}>
            {`${enforceTurnOrder ? 'Do not enforce' : 'Enforce'} turn order`}
          </a>
        </div>
        <div>
          <a onClick={this.handleToggleValidMovesClick}>
            {`${enforceValidMoves ? 'Allow invalid' : 'Enforce valid'} moves`}
          </a>
        </div>
        <div>
          <a onClick={this.handleShowNumbersClick}>
            {`${showNumbers ? 'Hide' : 'Show'} numbers`}
          </a>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.loadMap({ map: map1 })
    this.props.loadShapes({ shapes: shapes1 })
    this.props.loadElements({ elements: elements1 })
  }

  getHex = ({ xIndex, yIndex }) => {
    const { map } = this.props
    return _.get(map, `[${yIndex}][${xIndex}]`)
  }

  getShape = ({ xIndex, yIndex }) => {
    const { shapes } = this.props
    return _.find(shapes, { xIndex, yIndex })
  }

  handleKeydown = (event) => {
    // todo
    // console.log('handleKeydown', event)
  };

  handleElementClick = ({ element }) => {
    const { xIndex, yIndex } = element
    this.handleHexClick({ hex: this.getHex({ xIndex, yIndex }) })
  };

  handleHexClick = ({ hex }) => {
    const { xIndex, yIndex } = hex
    const shape = this.getShape({ xIndex, yIndex })
    if (shape) {
      this.handleShapeClick({ shape })
      return
    }
    const { selectedShape, moveSelectedShape, toggleTurn } = this.props
    if (selectedShape && this.isValidMove({ xIndex, yIndex })) {
      moveSelectedShape({ xIndex, yIndex })
      toggleTurn()
    }
  };

  handleShapeClick = ({ shape }) => {
    const {
      convertShape,
      enforceTurnOrder,
      selectedShape,
      selectShape,
      turn,
      unSelectShape,
    } = this.props
    if (
      selectedShape &&
      selectedShape.color !== shape.color &&
      this.isValidMove({ xIndex: shape.xIndex, yIndex: shape.yIndex })
    ) {
      convertShape({ shape, toColor: selectedShape.color })
      unSelectShape({ shape: selectedShape })
      return
    }
    if (enforceTurnOrder && shape.color !== turn) { // respect turn order
      return
    }
    shape.selected ? unSelectShape({ shape }) : selectShape({ shape })
  };

  handleShowNumbersClick = () => {
    this.props.toggleNumbers()
  };

  handleToggleEnforceTurnOrderClick = () => {
    const { selectedShape, unSelectShape } = this.props
    if (selectedShape) {
      unSelectShape({ shape: selectedShape })
    }
    this.props.toggleEnforceTurnOrder()
  };

  handleToggleValidMovesClick = () => {
    this.props.toggleValidMoves()
  };

  handleValidMoveClick = ({ xIndex, yIndex }) => {
    this.handleHexClick({ hex: this.getHex({ xIndex, yIndex }) })
  };

  isValidMove = ({ xIndex, yIndex }) => {
    const { enforceValidMoves, validMoves } = this.props
    if (enforceValidMoves) {
      return _.find(validMoves, { xIndex, yIndex })
    }
    return true
  };
}

const fields = [
  'svgHeight',
  'svgWidth',
  'viewBoxHeight',
  'viewBoxWidth',
  'viewBoxMinX',
  'viewBoxMinY',
]

export default reduxForm({
  form: 'hexViewForm',
  fields: fields,
  initialValues: {
    svgWidth: 500,
    svgHeight: 550,
    viewBoxMinX: 0,
    viewBoxMinY: 0,
    viewBoxWidth: 500,
    viewBoxHeight: 550,
  },
},
mapStateToSelectors({
  blackElements: selectors.blackElementsSelector,
  elements: selectors.elementsSelector,
  enforceTurnOrder: selectors.enforceTurnOrderSelector,
  enforceValidMoves: selectors.enforceValidMovesSelector,
  map: selectors.mapSelector,
  selectedShape: selectors.selectedShapeSelector,
  shapes: selectors.shapesSelector,
  showNumbers: selectors.showNumbersSelector,
  turn: selectors.turnSelector,
  validMoves: selectors.validMovesSelector,
  whiteElements: selectors.whiteElementsSelector,
}),
(dispatch) => bindActionCreators({
  convertShape: actions.convertShape,
  loadElements: actions.loadElements,
  loadMap: actions.loadMap,
  loadShapes: actions.loadShapes,
  moveSelectedShape: actions.moveSelectedShape,
  selectShape: actions.selectShape,
  toggleNumbers: actions.toggleNumbers,
  toggleEnforceTurnOrder: actions.toggleEnforceTurnOrder,
  toggleTurn: actions.toggleTurn,
  toggleValidMoves: actions.toggleValidMoves,
  unSelectShape: actions.unSelectShape,
}, dispatch),
)(HexView)
