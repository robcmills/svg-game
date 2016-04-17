import { createReducer } from 'utils/create-reducer'
import _ from 'lodash'

import * as actionTypes from './hex-view-action-types'

const initialState = {
  map: [],
  shapes: [],
  showNumbers: false,
}

export default createReducer(initialState, {
  [actionTypes.GIVE_ELEMENT_TO_PLAYER]: (state, { playerColor, element }) => {
    const newMap = _.map(_.cloneDeep(state.map), (row) => (
      _.map(row, (hex) => (
        hex.type === element.type
          ? _.assign(hex, { ownedBy: playerColor })
          : hex
      ))
    ))
    return {
      ...state,
      map: newMap,
    }
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
  [actionTypes.MOVE_SELECTED_SHAPE]: (state, { xIndex, yIndex }) => {
    const newShapes = _.cloneDeep(state.shapes)
    const selectedShape = _.find(newShapes, 'selected')
    _.assign(selectedShape, { xIndex, yIndex, selected: false })
    return {
      ...state,
      shapes: newShapes,
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
  [actionTypes.TOGGLE_NUMBERS]: (state) => {
    return {
      ...state,
      showNumbers: !state.showNumbers,
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
