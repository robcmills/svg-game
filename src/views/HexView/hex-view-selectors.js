import { createSelector } from 'reselect'
import { getValidShapeMoves } from 'utils/valid-moves'
import _ from 'lodash'

export const hexViewSelector = (state) => state.views.hexView

export const showMenuSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.showMenu
)

export const showNumbersSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.showNumbers
)

export const showRulesSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.showRules
)

export const boardSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.board
)

export const elementsSelector = createSelector(
  boardSelector,
  (board) => board.elements
)

export const shapesSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.shapes
)

export const selectedShapeSelector = createSelector(
  shapesSelector,
  (shapes) => _.find(shapes, 'selected')
)

export const blackElementsSelector = createSelector(
  shapesSelector,
  elementsSelector,
  (shapes, elements) => _.filter(
    elements, (element) => _.find(
      shapes, {
        color: 'black',
        xIndex: element.xIndex,
        yIndex: element.yIndex,
      }
    )
  )
)

export const whiteElementsSelector = createSelector(
  shapesSelector,
  elementsSelector,
  (shapes, elements) => _.filter(
    elements, (element) => _.find(
      shapes, {
        color: 'white',
        xIndex: element.xIndex,
        yIndex: element.yIndex,
      }
    )
  )
)

export const turnSelector = createSelector(
  hexViewSelector,
  (hevView) => hevView.turn
)

export const enforceTurnOrderSelector = createSelector(
  hexViewSelector,
  (hevView) => hevView.enforceTurnOrder
)

export const enforceValidMovesSelector = createSelector(
  hexViewSelector,
  (hevView) => hevView.enforceValidMoves
)

export const validMovesSelector = createSelector(
  blackElementsSelector,
  boardSelector,
  selectedShapeSelector,
  shapesSelector,
  whiteElementsSelector,
  (blackElements, board, selectedShape, shapes, whiteElements) => {
    const validMoves = []
    if (!selectedShape) {  // no shape selected
      return validMoves
    }
    validMoves.push(...getValidShapeMoves({
      blackElements,
      hexes: board.hexes,
      selectedShape,
      shapes,
      whiteElements,
    }))
    return validMoves
  }
)

export const winnerSelector = createSelector(
  blackElementsSelector,
  elementsSelector,
  shapesSelector,
  whiteElementsSelector,
  (blackElements, elements, shapes, whiteElements) => {
    if (blackElements.length === elements.length) {
      return 'black'
    }
    if (whiteElements.length === elements.length) {
      return 'white'
    }
    if (_.filter(shapes, ['color', 'white']).length === 0) {
      return 'black'
    }
    if (_.filter(shapes, ['color', 'black']).length === 0) {
      return 'white'
    }
  }
)
