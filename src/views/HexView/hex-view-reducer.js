import { createReducer } from 'utils/create-reducer'
import _ from 'lodash'

import * as actionTypes from './hex-view-action-types'

const initialState = {
  map: [],
  selectedShape: null,
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
    const selectedShape = _.find(newShapes, state.selectedShape)
    _.set(selectedShape, 'xIndex', xIndex)
    _.set(selectedShape, 'yIndex', yIndex)
    return {
      ...state,
      shapes: newShapes,
      selectedShape: null,
    }
  },
  [actionTypes.SELECT_SHAPE]: (state, { xIndex, yIndex }) => {
    return {
      ...state,
      selectedShape: { xIndex, yIndex },
    }
  },
  [actionTypes.TOGGLE_NUMBERS]: (state) => {
    return {
      ...state,
      showNumbers: !state.showNumbers,
    }
  },
})
