import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import * as selectors from './hex-view-selectors'
import * as actions from './hex-view-action-creators'
import { Elements, Map, Numbers, Shapes, Svg } from 'components'
import { elements1, map1, shapes1 } from 'data/maps/map1'
import { elementNames, HEX_RADIUS } from 'data/constants'
import styles from './hex-view.scss'

class HexView extends React.Component {
  static propTypes = {
    elements: PropTypes.array,
    fields: PropTypes.object,
    giveElementToPlayer: PropTypes.func.isRequired,
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
    unSelectShape: PropTypes.func.isRequired,
  };

  render () {
    const {
      elements,
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
    } = this.props
    const viewBox = _.map(
      [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight], 'value'
    )
    const offset = HEX_RADIUS * 2
    return (
      <div className={styles.root}>
        <div className={styles.svgWrap}>
          <Svg
            height={HEX_RADIUS * 24}
            viewBox={viewBox[0] ? viewBox.join(',') : null}
            width={HEX_RADIUS * 19}>
            <g>
              <Map
                hexes={map}
                onHexClick={this.handleHexClick}
                x={offset}
                y={offset}
              />
              <Shapes
                shapes={shapes}
                onShapeClick={this.handleShapeClick}
                selectedShape={selectedShape}
                x={offset}
                y={offset}
              />
              <Elements
                elements={elements}
                onElementClick={this.handleElementClick}
                selectedShape={selectedShape}
                x={offset}
                y={offset}
              />
              {showNumbers && <Numbers data={map} x={offset} y={offset} />}
            </g>
          </Svg>
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
    const { giveElementToPlayer, moveSelectedShape, selectedShape } = this.props
    if (selectedShape && this.isValidMove({ xIndex, yIndex })) {
      const playerColor = selectedShape.color
      giveElementToPlayer({ playerColor, element })
      moveSelectedShape({ xIndex, yIndex })
      return
    }
  };

  handleHexClick = ({ hex }) => {
    const { xIndex, yIndex } = hex
    const {
      selectedShape,
      moveSelectedShape,
      selectShape,
    } = this.props
    if (selectedShape && this.isValidMove({ xIndex, yIndex })) {
      moveSelectedShape({ xIndex, yIndex })
      return
    }
    const shape = this.getShape({ xIndex, yIndex })
    if (shape) {
      selectShape({ shape })
    }
  };

  handleShapeClick = ({ shape }) => {
    const { selectShape, unSelectShape } = this.props
    // todo : respect turn order
    shape.selected ? unSelectShape({ shape }) : selectShape({ shape })
  };

  handleShowNumbersClick = () => {
    this.props.toggleNumbers()
  }

  isElementHex = ({ hex }) => _.indexOf(elementNames, hex.type) > -1

  isValidMove = ({ xIndex, yIndex }) => {
    const { selectedShape } = this.props
    if (!selectedShape) {
      throw new Error('A shape must be selected when calling isValidMove')
    }
    if (selectedShape.xIndex === xIndex && selectedShape.yIndex === yIndex) {
      return false // is selected shape
    }
    const hex = this.getHex({ xIndex, yIndex })
    if (hex.type === 'empty') {
      return false
    }
    if (this.isElementHex({ hex })) { // todo && !player.elements contains element
      return false
    }
    const shape = this.getShape({ xIndex, yIndex })
    if (shape) { // todo isEnemyShape
      return false
    }
    // todo shape movements
    return true
  }
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
  elements: selectors.elementsSelector,
  map: selectors.mapSelector,
  selectedShape: selectors.selectedShapeSelector,
  shapes: selectors.shapesSelector,
  showNumbers: selectors.showNumbersSelector,
}),
(dispatch) => bindActionCreators({
  giveElementToPlayer: actions.giveElementToPlayer,
  loadElements: actions.loadElements,
  loadMap: actions.loadMap,
  loadShapes: actions.loadShapes,
  moveSelectedShape: actions.moveSelectedShape,
  selectShape: actions.selectShape,
  toggleNumbers: actions.toggleNumbers,
  unSelectShape: actions.unSelectShape,
}, dispatch),
)(HexView)
