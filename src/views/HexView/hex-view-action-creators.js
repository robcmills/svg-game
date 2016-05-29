import _ from 'lodash'
import * as actionTypes from './hex-view-action-types'

_.each(actionTypes, type => {
  module.exports[_.camelCase(type.split('/')[1])] = payload => {
    return (dispatch) => {
      dispatch({ type, payload })
    }
  }
})
