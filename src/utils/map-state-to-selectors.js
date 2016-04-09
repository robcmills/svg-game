import _ from 'lodash'

/**
 * Given an object mapping a name of a prop to the selector that computes that prop, return a
 * function that can be used by redux-react's connect function as its mapStateToProps argument.
 */
const mapStateToSelectors = (propToSelectorMap) => {
  return (state, props) => (
    _.mapValues(propToSelectorMap, (selector) => selector(state, props))
  )
}

export default mapStateToSelectors
