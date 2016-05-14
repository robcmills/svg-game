import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import * as selectors from './hex-view-selectors'
import * as actions from './hex-view-action-creators'
import { Board, Menu } from 'components'
import { elements1, map1, shapes1 } from 'data/maps/map1'
import styles from './hex-view.scss'

class HexView extends Component {
  static propTypes = {
    blackElements: PropTypes.array,
    convertShape: PropTypes.func.isRequired,
    elements: PropTypes.array,
    enforceTurnOrder: PropTypes.bool,
    enforceValidMoves: PropTypes.bool,
    loadElements: PropTypes.func.isRequired,
    loadMap: PropTypes.func.isRequired,
    loadShapes: PropTypes.func.isRequired,
    map: PropTypes.object.isRequired,
    moveShape: PropTypes.func.isRequired,
    selectedShape: PropTypes.object,
    selectShape: PropTypes.func.isRequired,
    shapes: PropTypes.array,
    showNumbers: PropTypes.bool,
    toggleMenu: PropTypes.func.isRequired,
    toggleNumbers: PropTypes.func.isRequired,
    toggleEnforceTurnOrder: PropTypes.func.isRequired,
    toggleValidMoves: PropTypes.func.isRequired,
    turn: PropTypes.string,
    unSelectShape: PropTypes.func.isRequired,
    validMoves: PropTypes.array,
    whiteElements: PropTypes.array,
    winner: PropTypes.string,
  };

  render () {
    const {
      blackElements,
      elements,
      enforceTurnOrder,
      map,
      selectedShape,
      shapes,
      showNumbers,
      turn,
      validMoves,
      whiteElements,
      winner,
    } = this.props

    return (
      <div className={styles.root}>
        <div className={styles.svgWrap}>
          <Board
            blackElements={blackElements}
            elements={elements}
            handleElementClick={this.handleElementClick}
            handleHexClick={this.handleHexClick}
            handleShapeClick={this.handleShapeClick}
            handleValidMoveClick={this.handleValidMoveClick}
            map={map}
            selectedShape={selectedShape}
            shapes={shapes}
            showNumbers={showNumbers}
            validMoves={validMoves}
            whiteElements={whiteElements}
          />
        </div>
        <div className={styles.turn}>
          {winner && `${winner} wins`}
          {!winner && enforceTurnOrder && `${turn} to play`}
        </div>
        <Menu />
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
    return _.get(map, `hexes[${yIndex}][${xIndex}]`)
  }

  getShape = ({ xIndex, yIndex }) => {
    const { shapes } = this.props
    return _.find(shapes, { xIndex, yIndex })
  }

  handleKeydown = (event) => {
    // todo
    // console.log('handleKeydown', event)
  }

  handleElementClick = ({ element }) => {
    const { xIndex, yIndex } = element
    this.handleHexClick({ hex: this.getHex({ xIndex, yIndex }) })
  }

  handleHexClick = ({ hex }) => {
    const { xIndex, yIndex } = hex
    const shape = this.getShape({ xIndex, yIndex })
    if (shape) {
      this.handleShapeClick({ shape })
      return
    }
    const { selectedShape, moveShape } = this.props
    if (selectedShape && this.isValidMove({ xIndex, yIndex })) {
      moveShape({ xIndex, yIndex })
    }
  }

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
  }

  handleShowNumbersClick = () => {
    this.props.toggleNumbers()
  }

  handleToggleEnforceTurnOrderClick = () => {
    const { selectedShape, unSelectShape } = this.props
    if (selectedShape) {
      unSelectShape({ shape: selectedShape })
    }
    this.props.toggleEnforceTurnOrder()
  }

  handleToggleValidMovesClick = () => {
    this.props.toggleValidMoves()
  }

  handleValidMoveClick = ({ xIndex, yIndex }) => {
    this.handleHexClick({ hex: this.getHex({ xIndex, yIndex }) })
  }

  isValidMove = ({ xIndex, yIndex }) => {
    const { enforceValidMoves, validMoves } = this.props
    if (enforceValidMoves) {
      return _.find(validMoves, { xIndex, yIndex })
    }
    return true
  }
}

export default connect(mapStateToSelectors({
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
  winner: selectors.winnerSelector,
}),
(dispatch) => bindActionCreators({
  convertShape: actions.convertShape,
  loadElements: actions.loadElements,
  loadMap: actions.loadMap,
  loadShapes: actions.loadShapes,
  moveShape: actions.moveShape,
  selectShape: actions.selectShape,
  toggleMenu: actions.toggleMenu,
  toggleNumbers: actions.toggleNumbers,
  toggleEnforceTurnOrder: actions.toggleEnforceTurnOrder,
  toggleValidMoves: actions.toggleValidMoves,
  unSelectShape: actions.unSelectShape,
}, dispatch),
)(HexView)
