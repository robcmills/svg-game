import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import * as actions from './hex-view-action-creators'
import { Map, Svg } from 'components'
import map1 from 'data/maps/map1'
import { HEX_RADIUS } from 'data/constants'
import styles from './hex-view.scss'

class HexView extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    loadMap: PropTypes.func.isRequired,
  };

  render () {
    const {
      fields: {
        viewBoxHeight,
        viewBoxWidth,
        viewBoxMinX,
        viewBoxMinY,
      },
    } = this.props
    const viewBox = _.map(
      [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight], 'value'
    )
    return (
      <div className={styles.root}>
        <Svg
          height={HEX_RADIUS * 22}
          viewBox={viewBox[0] ? viewBox.join(',') : null}
          width={HEX_RADIUS * 19}>
          <Map data={map1} x={HEX_RADIUS * 2} y={HEX_RADIUS * 2} />
        </Svg>
      </div>
    )
  }

  componentDidMount () {
    this.props.loadMap({ map: map1 })
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
}, null,
(dispatch) => bindActionCreators({
  loadMap: actions.loadMap,
}, dispatch),
)(HexView)
