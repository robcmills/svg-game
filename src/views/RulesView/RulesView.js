import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Map, Shapes, Svg, ValidMoves } from 'components'
import {
  circleMovementMap,
  circleMovementShapes,
  circleMovementValidMoves,
} from 'data/maps/circle-movement'
import styles from './rules-view.scss'

export class Rules extends Component {
  render () {
    return (
      <div className={styles.rules}>
        <h2>Shape movements</h2>
        <p>
          The <b>Circle</b> moves in a circular fashion
        </p>
        <div className={styles.svgWrap}>
          <Svg viewBox={`0, 0, ${circleMovementMap.width}, ${circleMovementMap.height}`}>
            <g>
              <Map
                hexes={circleMovementMap.hexes}
                x={circleMovementMap.offset}
                y={circleMovementMap.offset}
              />
              <Shapes
                shapes={circleMovementShapes}
                selectedShape={circleMovementShapes[0]}
                x={circleMovementMap.offset}
                y={circleMovementMap.offset}
              />
              <ValidMoves
                moves={circleMovementValidMoves}
                x={circleMovementMap.offset}
                y={circleMovementMap.offset}
              />
            </g>
          </Svg>
        </div>
      </div>
    )
  }
}

export default connect()(Rules)
