import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import { showNumbersSelector } from './hex-view-selectors'
import * as actions from './hex-view-action-creators'
import { Map, Numbers, Svg } from 'components'
import map1 from 'data/maps/map1'
// import shapes1 from 'data/shapes1'
import { HEX_RADIUS } from 'data/constants'
import styles from './hex-view.scss'

class HexView extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    loadMap: PropTypes.func.isRequired,
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
      showNumbers,
    } = this.props
    const viewBox = _.map(
      [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight], 'value'
    )
    return (
      <div className={styles.root}>
        <a onClick={this.handleShowNumbersClick}>{`${showNumbers ? 'Hide' : 'Show'} numbers`}</a>
        <Svg
          height={HEX_RADIUS * 22}
          viewBox={viewBox[0] ? viewBox.join(',') : null}
          width={HEX_RADIUS * 19}>
          <g>
            <Map data={map1} x={HEX_RADIUS * 2} y={HEX_RADIUS * 2} />
            {showNumbers && <Numbers data={map1} x={HEX_RADIUS * 2} y={HEX_RADIUS * 2} />}
          </g>
        </Svg>
      </div>
    )
  }

  componentDidMount () {
    this.props.loadMap({ map: map1 })
    // this.props.loadShapes({ shapes: shapes1 })
  }

  handleKeydown = (event) => {
    // todo
    // console.log('handleKeydown', event)
  };

  handleShowNumbersClick = () => {
    this.props.toggleNumbers()
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
  showNumbers: showNumbersSelector,
}),
(dispatch) => bindActionCreators({
  loadMap: actions.loadMap,
  toggleNumbers: actions.toggleNumbers,
}, dispatch),
)(HexView)
