import React, { Component, Fragment } from 'react'

import styles from './css/BottomBar.scss'

export default class BottomBar extends Component{
  render () {
    return (
      <Fragment>
        <div className={styles.container}>
          <img className={styles.imgMenu} src={this.props.image} />
          <span className={styles.items} >2 items</span>
          <span className={styles.prices} >Rp. 15.000</span>
          <a href='#' className={styles.button} >CHECK OUT</a>
        </div>
      </Fragment>
    ) 
  }
}