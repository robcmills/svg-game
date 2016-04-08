import { createReducer } from 'utils/create-reducer'

import * as actionTypes from './hex-view-action-types'

const initialState = {
  map: [],
}

export default createReducer(initialState, {
  [actionTypes.LOAD_MAP]: (state, { map }) => {
    return {
      ...state,
      map,
    }
  },
})
