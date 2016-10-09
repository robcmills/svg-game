import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import * as selectors from 'views/HexView/hex-view-selectors'
import * as actions from 'views/HexView/hex-view-action-creators'
import { undoActionCreators } from 'redux/modules/undo'
import styles from './menu.scss'

import MenuItem from './MenuItem'

class Menu extends Component {
  static propTypes = {
    // state
    enforceTurnOrder: PropTypes.bool.isRequired,
    enforceValidMoves: PropTypes.bool.isRequired,
    isTimeTravelExpanded: PropTypes.bool.isRequired,
    isSettingsExpanded: PropTypes.bool.isRequired,
    showMenu: PropTypes.bool.isRequired,
    showNumbers: PropTypes.bool.isRequired,
    // actions
    toggleNumbers: PropTypes.func.isRequired,
    toggleEnforceTurnOrder: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleRules: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    toggleTimeTravel: PropTypes.func.isRequired,
    toggleValidMoves: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
  };

  render () {
    const {
      enforceTurnOrder,
      enforceValidMoves,
      isTimeTravelExpanded,
      isSettingsExpanded,
      redo,
      showMenu,
      showNumbers,
      toggleEnforceTurnOrder,
      toggleMenu,
      toggleNumbers,
      toggleRules,
      toggleSettings,
      toggleTimeTravel,
      toggleValidMoves,
      undo,
    } = this.props
    return showMenu ? (
      <div className={styles.menu}>
        <MenuItem onClick={toggleMenu} text='Close' />
        <MenuItem onClick={toggleRules} text='How to Play' />
        <MenuItem
          isExpanded={isTimeTravelExpanded}
          onClick={toggleTimeTravel}
          text='Time Travel'
        >
          <MenuItem onClick={undo} text='Backwards' />
          <MenuItem onClick={redo} text='Forwards' />
        </MenuItem>
        <MenuItem
          isExpanded={isSettingsExpanded}
          onClick={toggleSettings}
          text='Settings'
        >
          <MenuItem
            onClick={toggleEnforceTurnOrder}
            text={`${enforceTurnOrder ? 'Do not enforce' : 'Enforce'} turn order`}
          />
          <MenuItem
            onClick={toggleValidMoves}
            text={`${enforceValidMoves ? 'Allow invalid' : 'Enforce valid'} moves`}
          />
          <MenuItem
            onClick={toggleNumbers}
            text={`${showNumbers ? 'Hide' : 'Show'} numbers`}
          />
        </MenuItem>
      </div>)
      : (<div className={classNames(styles.menu, styles.item)} onClick={toggleMenu}>
        <a>Menu</a>
      </div>)
  }
}

export default connect(
  mapStateToSelectors({
    enforceTurnOrder: selectors.enforceTurnOrderSelector,
    enforceValidMoves: selectors.enforceValidMovesSelector,
    isTimeTravelExpanded: selectors.isTimeTravelExpandedSelector,
    isSettingsExpanded: selectors.isSettingsExpandedSelector,
    showMenu: selectors.showMenuSelector,
    showNumbers: selectors.showNumbersSelector,
  }),
  (dispatch) => bindActionCreators({
    convertShape: actions.convertShape,
    toggleNumbers: actions.toggleNumbers,
    toggleEnforceTurnOrder: actions.toggleEnforceTurnOrder,
    toggleMenu: actions.toggleMenu,
    toggleRules: actions.toggleRules,
    toggleSettings: actions.toggleSettings,
    toggleTimeTravel: actions.toggleTimeTravel,
    toggleValidMoves: actions.toggleValidMoves,
    redo: undoActionCreators.redo,
    undo: undoActionCreators.undo,
  }, dispatch),
)(Menu)
