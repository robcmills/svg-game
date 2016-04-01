import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import counter from './modules/counter'

export default combineReducers({
  counter,
  form,
  router
})
