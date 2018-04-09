import React, { Component, Fragment } from 'react'
import Link from 'react-toolbox/lib/link'
import { CardActions } from 'react-toolbox/lib/card'

import styles from './css/LeftBar.scss'

export default class LeftBar extends Component {
  render() {
    return (
      <Fragment>
        <CardActions className={styles.leftBar} >
          <Link className={styles.categories} href='#' active label='Special' />
          <Link className={styles.categories} href='#' label='Soups' />
          <Link className={styles.categories} href='#' label='Pasta' />
        </CardActions>
      </Fragment>
    )
  }
}