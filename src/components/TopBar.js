import React, { Component } from 'react'
// import { Card } from 'react-toolbox/lib/card'

import styles from './css/TopBar.scss'

import { user } from '../services/stores'

export default class TopBar extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.resto}>
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.sub}>{this.props.sub}</div>
          </div>
          <div className={styles.user}>
            <div>Mr/Mrs. {user.name}</div>
            <div>{this.props.status2}</div>
          </div>
        </header>
      </div>

    )
  }
}