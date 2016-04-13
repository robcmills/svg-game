import { createReducer } from 'utils/create-reducer'

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
  [actionTypes.SET_SELECTED_SHAPE]: (state, { xIndex, yIndex }) => {
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
