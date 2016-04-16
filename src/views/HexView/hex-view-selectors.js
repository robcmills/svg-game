import { createSelector } from 'reselect'
import _ from 'lodash'

export const hexViewSelector = (state) => state.views.hexView

export const showNumbersSelector = createSelector(
	hexViewSelector,
	(hexView) => hexView.showNumbers
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

