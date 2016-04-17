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
    blackElements: PropTypes.array,
    convertShape: PropTypes.func.isRequired,
    elements: PropTypes.array,
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
    unSelectShape: PropTypes.func.isRequired,
    whiteElements: PropTypes.array,
  };

  render () {
    const {
      blackElements,
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
      whiteElements,
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
    this.handleHexClick({ hex: this.getHex({ xIndex, yIndex }) })
  };

  handleHexClick = ({ hex }) => {
    const { xIndex, yIndex } = hex
    const shape = this.getShape({ xIndex, yIndex })
    if (shape) {
      this.handleShapeClick({ shape })
      return
    }
    const { selectedShape, moveSelectedShape } = this.props
    if (selectedShape && this.isValidMove({ xIndex, yIndex })) {
      moveSelectedShape({ xIndex, yIndex })
    }
  };

  handleShapeClick = ({ shape }) => {
    const { convertShape, selectedShape, selectShape, unSelectShape } = this.props
    if (
      selectedShape &&
      selectedShape.color !== shape.color &&
      this.isValidMove({ xIndex: shape.xIndex, yIndex: shape.yIndex })
    ) {
      convertShape({ shape, toColor: selectedShape.color })
      unSelectShape({ shape: selectedShape })
      return
    }
    // todo : respect turn order
    shape.selected ? unSelectShape({ shape }) : selectShape({ shape })
  };

  handleShowNumbersClick = () => {
    this.props.toggleNumbers()
  };

  isElementHex = ({ hex }) => _.indexOf(elementNames, hex.type) > -1;

  isValidConversion = ({ converter, convertee }) => {
    switch (converter) {
      case 'circle':
        return convertee === 'triangle'
      case 'square':
        return convertee === 'circle'
      case 'triangle':
        return convertee === 'square'
    }
  };

  isValidMove = ({ xIndex, yIndex }) => {
    const { blackElements, selectedShape, whiteElements } = this.props
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
    const playerElements = selectedShape.color === 'black' ? blackElements : whiteElements
    if (this.isElementHex({ hex }) &&
      !_.find(playerElements, { type: hex.type })) {
      return false
    }
    const shape = this.getShape({ xIndex, yIndex })
    if (shape && shape.color !== selectedShape.color) {
      return this.isValidConversion({
        converter: selectedShape.type,
        convertee: shape.type,
      })
    }
    // todo shape movements
    // todo rock paper scissor mechanic
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
  map: selectors.mapSelector,
  selectedShape: selectors.selectedShapeSelector,
  shapes: selectors.shapesSelector,
  showNumbers: selectors.showNumbersSelector,
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
  unSelectShape: actions.unSelectShape,
}, dispatch),
)(HexView)
