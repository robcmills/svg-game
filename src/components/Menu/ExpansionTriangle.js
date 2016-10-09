import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './menu.scss'

const ExpansionTriangle = ({ isExpanded }) => (
  <div className={classNames(styles.triangle, (isExpanded ? styles.expanded : styles.collapsed))}>
    ▶
  </div>
)

ExpansionTriangle.propTypes = {
  isExpanded: PropTypes.bool,
}

export default ExpansionTriangle
