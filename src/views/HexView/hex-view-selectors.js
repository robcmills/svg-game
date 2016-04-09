import { createSelector } from 'reselect'

export const hexViewSelector = (state) => state.views.hexView

export const showNumbersSelector = createSelector(
	hexViewSelector,
	(hexView) => hexView.showNumbers
)
