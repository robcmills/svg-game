import * as actionTypes from './hex-view-action-types'

export function convertShape (payload) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CONVERT_SHAPE,
      payload: payload,
    })
  }
}

export function loadElements ({ elements }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_ELEMENTS,
      payload: { elements },
    })
  }
}

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

export function selectShape (payload) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_SHAPE,
      payload,
    })
  }
}

export function toggleEnforceTurnOrder () {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_ENFORCE_TURN_ORDER,
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

export function toggleTurn () {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_TURN,
    })
  }
}

export function toggleValidMoves () {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_VALID_MOVES,
    })
  }
}

export function unSelectShape (payload) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UNSELECT_SHAPE,
      payload,
    })
  }
}
