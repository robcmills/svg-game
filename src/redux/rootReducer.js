import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import views from 'views/reducer'

export default combineReducers({
  form,
  router,
  views,
})
