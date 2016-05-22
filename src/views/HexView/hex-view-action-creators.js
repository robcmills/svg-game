import * as actionTypes from './hex-view-action-types'

export function convertShape (payload) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CONVERT_SHAPE,
      payload: payload,
    })
  }
}

export function loadBoard ({ board }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_BOARD,
      payload: { board },
    })
  }
}

export function moveShape ({ xIndex, yIndex }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MOVE_SHAPE,
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

export function toggleMenu () {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_MENU,
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

export function toggleRules () {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_RULES,
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
