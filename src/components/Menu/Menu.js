import React, { PropTypes } from 'react'

import styles from './menu.scss'

const Menu = ({
  enforceTurnOrder,
  enforceValidMoves,
  onShowNumbersClick,
  onToggleEnforceTurnOrderClick,
  onToggleValidMovesClick,
  redo,
  showNumbers,
  undo,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <a onClick={undo}>Undo</a>
      </div>
      <div className={styles.item}>
        <a onClick={redo}>Redo</a>
      </div>
      <div className={styles.item}>
        <a onClick={onToggleEnforceTurnOrderClick}>
          {`${enforceTurnOrder ? 'Do not enforce' : 'Enforce'} turn order`}
        </a>
      </div>
      <div className={styles.item}>
        <a onClick={onToggleValidMovesClick}>
          {`${enforceValidMoves ? 'Allow invalid' : 'Enforce valid'} moves`}
        </a>
      </div>
      <div className={styles.item}>
        <a onClick={onShowNumbersClick}>
          {`${showNumbers ? 'Hide' : 'Show'} numbers`}
        </a>
      </div>
    </div>
  )
}

Menu.propTypes = {
  enforceTurnOrder: PropTypes.bool.isRequired,
  enforceValidMoves: PropTypes.bool.isRequired,
  onShowNumbersClick: PropTypes.func.isRequired,
  onToggleEnforceTurnOrderClick: PropTypes.func.isRequired,
  onToggleValidMovesClick: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  undo: PropTypes.func.isRequired,
}

export default Menu
