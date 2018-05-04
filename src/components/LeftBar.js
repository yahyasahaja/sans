import React, { Component, Fragment } from 'react'
import Link from 'react-toolbox/lib/link'
import { CardActions } from 'react-toolbox/lib/card'

import styles from './css/LeftBar.scss'

export default class LeftBar extends Component {
  render() {
    return (
      <Fragment>
        <CardActions className={styles.leftBar} >
          <Link className={styles.categories} href='#' active label='SPECIAL' />
          <Link className={styles.categories} href='#' label='MURAH' />
          <Link className={styles.categories} href='#' label='DAGING' />
          <Link className={styles.categories} href='#' label='AYAM' />
          <Link className={styles.categories} href='#' label='MINUMAN' />
        </CardActions>
      </Fragment>
    )
  }
}