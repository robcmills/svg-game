import { diff, applyChange, revertChange } from 'deep-diff'
import _ from 'lodash'

export const undoActionTypes = {
  UNDO: '@@undo/UNDO',
  REDO: '@@undo/REDO',
}

export const undoActionCreators = {
  undo: () => dispatch => dispatch({ type: undoActionTypes.UNDO }),
  redo: () => dispatch => dispatch({ type: undoActionTypes.REDO }),
}

export const undoActionHandlers = {
  [undoActionTypes.UNDO]: (state, action) => {
    const newState = _.cloneDeep(state)
    const newUndo = newState.undo
    const prevIndex = newUndo.currentIndex - 1
    const prevDiff = _.get(newUndo.diffs, `[${prevIndex}]`)
    if (prevDiff) {
      _.forEach(prevDiff, change => revertChange(newState, true, change))
      newUndo.currentIndex--
    }
    return { ...newState, undo: newUndo }
  },
  [undoActionTypes.REDO]: (state, action) => {
    const newState = _.cloneDeep(state)
    const newUndo = newState.undo
    const prevIndex = newUndo.currentIndex
    const prevDiff = _.get(newUndo.diffs, `[${prevIndex}]`)
    if (prevDiff) {
      _.forEach(prevDiff, change => applyChange(newState, true, change))
      newUndo.currentIndex++
    }
    return { ...newState, undo: newUndo }
  },
}

const initialState = {
  currentIndex: 0,
  diffs: [],
}

const defaultConfig = {}

export const undoable = (reducer, config = defaultConfig) => {
  return (state, action) => {
    const handler = undoActionHandlers[action.type]
    if (handler) {
      return handler(state, action)
    }
    const prevState = state ? _.omit(state, 'undo') : state
    const newState = reducer(prevState, action)
    const newDiff = diff(prevState, newState)
    const newUndo = _.cloneDeep(_.get(state, 'undo', initialState))
    if (newDiff) {
      newUndo.diffs.push(newDiff)
      newUndo.currentIndex++
    }
    return { ...newState, undo: newUndo }
  }
}
