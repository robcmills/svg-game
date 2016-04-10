import * as actionTypes from './hex-view-action-types'

export function loadMap ({ map }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_MAP,
      payload: { map },
    })
  }
}

export function loadShapes ({ shapes }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_SHAPES,
      payload: { shapes },
    })
  }
}

export function toggleNumbers () {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_NUMBERS,
    })
  }
}
