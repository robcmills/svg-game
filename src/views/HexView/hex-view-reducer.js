import { createReducer } from 'utils/create-reducer'
import _ from 'lodash'

import * as actionTypes from './hex-view-action-types'

const initialState = {
  enforceTurnOrder: true,
  enforceValidMoves: true,
  map: {
    offset: 0,
    height: 0,
    hexes: [],
    width: 0,
  },
  shapes: [],
  showMenu: false,
  showNumbers: false,
  turn: 'white',
}

export default createReducer(initialState, {
  [actionTypes.CONVERT_SHAPE]: (state, { shape, toColor }) => {
    const newShapes = _.cloneDeep(state.shapes)
    const shapeToConvert = _.find(newShapes, shape)
    _.assign(shapeToConvert, { color: toColor })
    return { ...state, shapes: newShapes }
  },
  [actionTypes.LOAD_ELEMENTS]: (state, { elements }) => {
    return { ...state, elements }
  },
  [actionTypes.LOAD_MAP]: (state, { map }) => {
    return { ...state, map }
  },
  [actionTypes.LOAD_SHAPES]: (state, { shapes }) => {
    return { ...state, shapes }
  },
  [actionTypes.MOVE_SHAPE]: (state, { xIndex, yIndex }) => {
    const newShapes = _.cloneDeep(state.shapes)
    const selectedShape = _.find(newShapes, 'selected')
    _.assign(selectedShape, { xIndex, yIndex, selected: false })
    return {
      ...state,
      shapes: newShapes,
      turn: state.turn === 'black' ? 'white' : 'black',
    }
  },
  [actionTypes.SELECT_SHAPE]: (state, { shape: { xIndex, yIndex } }) => {
    const newShapes = _.map(_.cloneDeep(state.shapes), (shape) => {
      shape.selected = shape.xIndex === xIndex && shape.yIndex === yIndex
      return shape
    })
    return {
      ...state,
      shapes: newShapes,
    }
  },
  [actionTypes.TOGGLE_ENFORCE_TURN_ORDER]: (state) => {
    return {
      ...state,
      enforceTurnOrder: !state.enforceTurnOrder,
    }
  },
  [actionTypes.TOGGLE_MENU]: (state) => {
    return {
      ...state,
      showMenu: !state.showMenu,
    }
  },
  [actionTypes.TOGGLE_NUMBERS]: (state) => {
    return {
      ...state,
      showNumbers: !state.showNumbers,
    }
  },
  [actionTypes.TOGGLE_VALID_MOVES]: (state) => {
    return {
      ...state,
      enforceValidMoves: !state.enforceValidMoves,
    }
  },
  [actionTypes.UNSELECT_SHAPE]: (state, { shape: { xIndex, yIndex } }) => {
    const newShapes = _.map(_.cloneDeep(state.shapes), (shape) => {
      shape.selected = false
      return shape
    })
    return {
      ...state,
      shapes: newShapes,
    }
  },
})
