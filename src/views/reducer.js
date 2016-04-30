import { combineReducers } from 'redux'

import { undoable } from 'redux/modules/undo'
import hexView from './HexView/hex-view-reducer'

export default combineReducers({
  hexView: undoable(hexView),
})
