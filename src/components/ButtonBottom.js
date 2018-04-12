import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import styles from './css/ButtonBottom.scss'

export default class BottomBar extends Component {
  render () {
    return (
      <Fragment>
        <Link to={this.props.link} >
          <div className={styles.container}>
            <div className={styles.go} >{this.props.name}</div>
          </div>
        </Link>
      </Fragment>
    ) 
  }
}