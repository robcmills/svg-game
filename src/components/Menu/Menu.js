import React, { PropTypes } from 'react'

import styles from './menu.scss'

const Menu = ({
  enforceTurnOrder,
  enforceValidMoves,
  onShowNumbersClick,
  onToggleEnforceTurnOrderClick,
  onToggleValidMovesClick,
  showNumbers,
}) => {
  return (
    <div className={styles.root}>
      <div>
        <a onClick={onToggleEnforceTurnOrderClick}>
          {`${enforceTurnOrder ? 'Do not enforce' : 'Enforce'} turn order`}
        </a>
      </div>
      <div>
        <a onClick={onToggleValidMovesClick}>
          {`${enforceValidMoves ? 'Allow invalid' : 'Enforce valid'} moves`}
        </a>
      </div>
      <div>
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
  showNumbers: PropTypes.bool.isRequired,
}

export default Menu
