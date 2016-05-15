import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Board } from 'components'
import circleMovementBoard from 'data/boards/circle-movement'
import circleMovementValidMoves from 'data/boards/circle-movement/valid-moves'
import squareMovementBoard from 'data/boards/square-movement'
import squareMovementValidMoves from 'data/boards/square-movement/valid-moves'
import triangleMovementBoard from 'data/boards/triangle-movement'
import triangleMovementValidMoves from 'data/boards/triangle-movement/valid-moves'
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
          <Board
            board={circleMovementBoard}
            selectedShape={circleMovementBoard.shapes[0]}
            shapes={circleMovementBoard.shapes}
            validMoves={circleMovementValidMoves}
          />
        </div>

        <p>
          The <b>Square</b> moves in straight lines
        </p>
        <div className={styles.svgWrap}>
          <Board
            board={squareMovementBoard}
            selectedShape={squareMovementBoard.shapes[0]}
            shapes={squareMovementBoard.shapes}
            validMoves={squareMovementValidMoves}
          />
        </div>

        <p>
          The <b>Triangle</b> moves by angles
        </p>
        <div className={styles.svgWrap}>
          <Board
            board={triangleMovementBoard}
            selectedShape={triangleMovementBoard.shapes[0]}
            shapes={triangleMovementBoard.shapes}
            validMoves={triangleMovementValidMoves}
          />
        </div>
      </div>
    )
  }
}

export default connect()(Rules)
