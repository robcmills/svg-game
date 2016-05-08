import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router'

import mapStateToSelectors from 'utils/map-state-to-selectors'
import * as selectors from 'views/HexView/hex-view-selectors'
import * as actions from 'views/HexView/hex-view-action-creators'
import { undoActionCreators } from 'redux/modules/undo'
import styles from './menu.scss'

class Menu extends Component {
  static propTypes = {
    // state
    enforceTurnOrder: PropTypes.bool.isRequired,
    enforceValidMoves: PropTypes.bool.isRequired,
    showMenu: PropTypes.bool.isRequired,
    showNumbers: PropTypes.bool.isRequired,
    // actions
    toggleNumbers: PropTypes.func.isRequired,
    toggleEnforceTurnOrder: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleValidMoves: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
  };

  render () {
    const {
      enforceTurnOrder,
      enforceValidMoves,
      toggleNumbers,
      toggleEnforceTurnOrder,
      toggleValidMoves,
      redo,
      showMenu,
      showNumbers,
      toggleMenu,
      undo,
    } = this.props
    return showMenu ? (
      <div className={styles.menu}>
        <div className={styles.item} onClick={toggleMenu}>
          <a>Close</a>
        </div>
        <div className={styles.item}>
          <Link to='/rules'>How to play</Link>
        </div>
        <div className={styles.item} onClick={undo}>
          <a>Undo</a>
        </div>
        <div className={styles.item} onClick={redo}>
          <a>Redo</a>
        </div>
        <div className={styles.item} onClick={toggleEnforceTurnOrder}>
          <a>
            {`${enforceTurnOrder ? 'Do not enforce' : 'Enforce'} turn order`}
          </a>
        </div>
        <div className={styles.item} onClick={toggleValidMoves}>
          <a>
            {`${enforceValidMoves ? 'Allow invalid' : 'Enforce valid'} moves`}
          </a>
        </div>
        <div className={styles.item} onClick={toggleNumbers}>
          <a>
            {`${showNumbers ? 'Hide' : 'Show'} numbers`}
          </a>
        </div>
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
    showMenu: selectors.showMenuSelector,
    showNumbers: selectors.showNumbersSelector,
  }),
  (dispatch) => bindActionCreators({
    convertShape: actions.convertShape,
    toggleNumbers: actions.toggleNumbers,
    toggleEnforceTurnOrder: actions.toggleEnforceTurnOrder,
    toggleMenu: actions.toggleMenu,
    toggleValidMoves: actions.toggleValidMoves,
    redo: undoActionCreators.redo,
    undo: undoActionCreators.undo,
  }, dispatch),
)(Menu)
