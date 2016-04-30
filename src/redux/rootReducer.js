import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import { undoReducer as undo } from 'redux/modules/undo'
import views from 'views/reducer'

export default combineReducers({
  form,
  router,
  undo,
  views,
})
