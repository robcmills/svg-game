import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import {
  mapSelector,
  selectedShapeSelector,
  shapesSelector,
  showNumbersSelector
} from './hex-view-selectors'
import * as actions from './hex-view-action-creators'
import { Map, Numbers, Shapes, Svg } from 'components'
import map1 from 'data/maps/map1'
import shapes1 from 'data/maps/shapes1'
import { elements, HEX_RADIUS } from 'data/constants'
import styles from './hex-view.scss'

class HexView extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    loadMap: PropTypes.func.isRequired,
    loadShapes: PropTypes.func.isRequired,
    map: PropTypes.array,
    moveSelectedShape: PropTypes.func.isRequired,
    selectedShape: PropTypes.object,
    setSelectedShape: PropTypes.func.isRequired,
    shapes: PropTypes.array,
    showNumbers: PropTypes.bool,
    toggleNumbers: PropTypes.func.isRequired,
  };

  render () {
    const {
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
        <Svg
          height={HEX_RADIUS * 22}
          viewBox={viewBox[0] ? viewBox.join(',') : null}
          width={HEX_RADIUS * 19}>
          <g>
            <Map
              data={map}
              onHexClick={this.handleHexClick}
              x={offset}
              y={offset}
            />
            <Shapes
              data={shapes}
              onShapeClick={this.handleShapeClick}
              selectedShape={selectedShape}
              x={offset}
              y={offset}
            />
            {showNumbers && <Numbers data={map} x={offset} y={offset} />}
          </g>
        </Svg>
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
  }

  handleKeydown = (event) => {
    // todo
    // console.log('handleKeydown', event)
  };

  handleHexClick = ({ xIndex, yIndex }) => {
    if (this.isValidMove({ xIndex, yIndex })) {
      this.props.moveSelectedShape({ xIndex, yIndex })
    }
  };

  handleShapeClick = ({ shape, xIndex, yIndex }) => {
    if (_.indexOf(['circle', 'square', 'triangle'], shape) > -1) {
      this.props.setSelectedShape({ xIndex, yIndex })
    }
  };

  handleShowNumbersClick = () => {
    this.props.toggleNumbers()
  }

  isValidMove = ({ xIndex, yIndex }) => {
    let isValid = true
    const { map, selectedShape } = this.props
    if (_.isEqual({ xIndex, yIndex }, selectedShape)) {
      isValid = false
    }
    const isElement = _.indexOf(elements, map[yIndex][xIndex]) > -1
    if (isElement) { // temporary logic
      isValid = false
    }
    return isValid
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
    svgHeight: 500,
    viewBoxMinX: 0,
    viewBoxMinY: 0,
    viewBoxWidth: 500,
    viewBoxHeight: 500,
  },
},
mapStateToSelectors({
  map: mapSelector,
  selectedShape: selectedShapeSelector,
  shapes: shapesSelector,
  showNumbers: showNumbersSelector,
}),
(dispatch) => bindActionCreators({
  loadMap: actions.loadMap,
  loadShapes: actions.loadShapes,
  moveSelectedShape: actions.moveSelectedShape,
  setSelectedShape: actions.setSelectedShape,
  toggleNumbers: actions.toggleNumbers,
}, dispatch),
)(HexView)
