import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import styles from './css/BottomBar.scss'

export default class BottomBar extends Component {
  render () {
    let link = `/${this.props.match.params.resto_slug}/checkout`
    return (
      <Fragment>
        <div className={styles.container}>
          <img className={styles.imgMenu} src={this.props.image} />
          <span className={styles.items} >{this.props.item} items</span>
          <span className={styles.prices} >Rp. {this.props.price}</span>
          <Link className={styles.button} to={link} >CHECK OUT</Link>
        </div>
      </Fragment>
    ) 
  }
}