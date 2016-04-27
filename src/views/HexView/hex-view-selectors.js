import { createSelector } from 'reselect'
import { getValidShapeMoves } from 'utils/valid-moves'
import _ from 'lodash'

export const hexViewSelector = (state) => state.views.hexView

export const showNumbersSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.showNumbers
)

export const elementsSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.elements
)

export const mapSelector = createSelector(
  hexViewSelector,
  (hexView) => hexView.map
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

export const enforceValidMovesSelector = createSelector(
  hexViewSelector,
  (hevView) => hevView.enforceValidMoves
)

export const validMovesSelector = createSelector(
  blackElementsSelector,
  mapSelector,
  selectedShapeSelector,
  shapesSelector,
  whiteElementsSelector,
  (blackElements, map, selectedShape, shapes, whiteElements) => {
    const validMoves = []
    if (!selectedShape) {  // no shape selected
      return validMoves
    }
    validMoves.push(...getValidShapeMoves({
      blackElements,
      map,
      selectedShape,
      shapes,
      whiteElements,
    }))
    return validMoves
  }
)
