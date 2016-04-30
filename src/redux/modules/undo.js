import { diff, revertChange } from 'deep-diff'
import _ from 'lodash'

export const undoActionTypes = {
  UNDO: 'undo/UNDO',
}

export const undoActionCreators = {
  undo: () => dispatch => dispatch({ type: undoActionTypes.UNDO }),
}

const initialState = {
  currentIndex: 0,
  diffs: [],
}

export const undoable = reducer => {
  return (state, action) => {
    // handlers
    if (action.type === undoActionTypes.UNDO) {
      const newState = _.cloneDeep(state)
      const newUndo = newState.undo
      const lastIndex = newUndo.currentIndex - 1
      const lastDiff = _.get(newUndo.diffs, `[${lastIndex}]`)
      if (lastDiff) {
        _.forEach(lastDiff, change => revertChange(newState, true, change))
        newUndo.currentIndex--
      }
      return { ...newState, undo: newUndo }
    }

    const prevState = _.omit(state, 'undo')
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
