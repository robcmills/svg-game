import { diff } from 'deep-diff'
import _ from 'lodash'
import { createReducer } from 'utils/create-reducer'

export const undoActionTypes = {
  ADD_DIFF: 'undo/ADD_DIFF',
}

export const undoMiddleware = ({ dispatch, getState }) => next => action => {
  const prevState = getState()
  const result = next(action)
  if (_.indexOf(_.values(undoActionTypes), action.type) > -1) {
    return result
  }
  const nextState = getState()
  const stateDiff = diff(prevState, nextState)
  dispatch({
    type: undoActionTypes.ADD_DIFF,
    payload: { diff: stateDiff },
  })
  return result
}

const initialState = {
  diffs: [],
}

export const undoReducer = createReducer(initialState, {
  [undoActionTypes.ADD_DIFF]: (state, { diff }) => {
    const newDiffs = _.cloneDeep(state.diffs)
    newDiffs.push(diff)
    return { ...state, diffs: newDiffs }
  },
})
