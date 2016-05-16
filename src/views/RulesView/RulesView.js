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

        <h2>Conversions</h2>
        <p>
          If an opponent shape is located on a hex that is a valid move for one of your shapes,
          selecting your shape and then selecting the opponent shape will immediately convert it
          to your color, and it remains your turn. You may then use the newly converted shape to
          continue converting other nearby opponent shapes, in potentially long chains of
          conversions that drastically sway the game. Your turn ends when you move a shape.
        </p>

        <h2>Rock, Paper, Scissor Mechanic</h2>
        <p>
          Each shape type can only convert one other type:<br />
          Circles (rock) can convert Triangles (scissor)<br />
          Squares (paper) can convert Circles (rock)<br />
          Triangles (scissor) can convert Squares (paper)<br />
        </p>

        <h2>Elements</h2>
        <p>
          There are four elements:<br />
          Fire (red)<br />
          Water (blue)<br />
          Sky (light blue)<br />
          Earth (green)<br />
          There are two types of each element on the board:<br />
          Element hexes (colored hexes)<br />
          Element tokens (small colored circles)<br />
          A player may not move his shapes onto or through element hexes unless
          he owns the corresponding element token by moving any of his shapes
          onto the hex containing it.
        </p>

        <h2>Winning</h2>
        <p>
          The first player to own all four elements or convert all opponent shapes wins.
        </p>

        <a href='/hex'>Back</a>
      </div>
    )
  }
}

export default connect()(Rules)
