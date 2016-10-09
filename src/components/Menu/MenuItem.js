import React, { PropTypes } from 'react'

import ExpansionTriangle from './ExpansionTriangle'
import styles from './menu.scss'

const MenuItem = ({ children, isExpanded, onClick, text }) => (
  <div>
    <div className={styles.item} onClick={onClick}>
      <div className={styles.link}>
        {children &&
          <div className={styles.expandWrap}>
            <ExpansionTriangle isExpanded={isExpanded} />
          </div>
        }
        {text}
      </div>
    </div>
    {isExpanded && <div className={styles.children}>{children}</div>}
  </div>
)

MenuItem.propTypes = {
  children: PropTypes.array,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
}

export default MenuItem
