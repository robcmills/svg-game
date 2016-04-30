import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

// import { undoMiddleware } from 'redux/modules/undo'

export default function configureStore (initialState = {}, history) {
  let middleware = [thunk, routerMiddleware(history)]

  if (__DEBUG__) {
    const logger = createLogger({ collapsed: true })
    middleware.push(logger)
  }

  const store = applyMiddleware(...middleware)(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
