import { createSelector } from 'reselect'
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
