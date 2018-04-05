import React, { Component } from 'react'
// import { Card } from 'react-toolbox/lib/card'

import styles from './css/TopBar.scss'

export default class TopBar extends Component {
  render() {
    return (

      <header className={styles.header}>
        <div className={styles.resto}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.sub}>{this.props.sub}</div>
        </div>
        <div className={styles.user}>
          <div>{this.props.status1}</div>
          <div>{this.props.status2}</div>
        </div>
      </header>

    )
  }
}