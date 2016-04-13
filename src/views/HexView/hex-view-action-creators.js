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

export function moveSelectedShape ({ xIndex, yIndex }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MOVE_SELECTED_SHAPE,
      payload: { xIndex, yIndex },
    })
  }
}

export function setSelectedShape ({ xIndex, yIndex }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_SELECTED_SHAPE,
      payload: { xIndex, yIndex },
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
