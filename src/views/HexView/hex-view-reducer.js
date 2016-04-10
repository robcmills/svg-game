import { createReducer } from 'utils/create-reducer'

import * as actionTypes from './hex-view-action-types'

const initialState = {
  map: [],
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
  [actionTypes.TOGGLE_NUMBERS]: (state) => {
    return {
      ...state,
      showNumbers: !state.showNumbers,
    }
  },
})
