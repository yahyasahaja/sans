import React, { Component, Fragment } from 'react'

import styles from './css/ButtonBottom.scss'

export default class BottomBar extends Component {
  render () {
    return (
      <Fragment>
        <a href={this.props.link} >
          <div className={styles.container}>
            <div className={styles.go} >{this.props.name}</div>
          </div>
        </a>
      </Fragment>
    ) 
  }
}