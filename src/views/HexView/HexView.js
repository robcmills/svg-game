import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

import { Map, Svg } from 'components'
import map1 from 'data/maps/map1'
// import styles from './hex-view.scss'

class HexView extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
  };

  render () {
    const {
      fields: {
        svgHeight,
        svgWidth,
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
      <div>
        <h1>HexView</h1>
        <Svg
          height={svgHeight.value}
          viewBox={viewBox[0] ? viewBox.join(',') : null}
          width={svgWidth.value}>
          <Map data={map1} x={100} y={100} />
        </Svg>
      </div>
    )
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
    svgWidth: 300,
    svgHeight: 300,
    viewBoxMinX: 0,
    viewBoxMinY: 0,
    viewBoxWidth: 300,
    viewBoxHeight: 300,
  },
}, null, null,
)(HexView)
