import { createReducer } from 'utils/create-reducer'
import _ from 'lodash'

import * as actionTypes from './hex-view-action-types'

const initialState = {
  map: [],
  players: [{ color: 'white', elements: [] }, { color: 'black', elements: [] }],
  shapes: [],
  showNumbers: false,
}

export default createReducer(initialState, {
  [actionTypes.LOAD_MAP]: (state, { map }) => {
    return {
      ...state,
      map,
    }
  },
  [actionTypes.LOAD_SHAPES]: (state, { shapes }) => {
    return {
      ...state,
      shapes,
    }
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
  [actionTypes.SELECT_SHAPE]: (state, { xIndex, yIndex }) => {
    const newShapes = _.map(_.cloneDeep(state.shapes), (shape) => {
      shape.selected = shape.type !== 'element' &&
        shape.xIndex === xIndex && shape.yIndex === yIndex
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
})
