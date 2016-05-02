import { combineReducers } from 'redux'
import _ from 'lodash'

import { undoable } from 'redux/modules/undo'
import hexView from './HexView/hex-view-reducer'
import {
	CONVERT_SHAPE,
	MOVE_SHAPE,
	SELECT_SHAPE,
	UNSELECT_SHAPE,
} from './HexView/hex-view-action-types'

const allowedActions = [CONVERT_SHAPE, MOVE_SHAPE, SELECT_SHAPE, UNSELECT_SHAPE]
const actionsFilter = ({ type }) => _.indexOf(allowedActions, type) > -1

export default combineReducers({
  hexView: undoable(hexView, { actionsFilter }),
})
