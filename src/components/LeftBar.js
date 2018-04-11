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
          <Link className={styles.categories} href='#' label='SOUPS' />
          <Link className={styles.categories} href='#' label='PASTA' />
          <Link className={styles.categories} href='#' label='WRAPS' />
          <Link className={styles.categories} href='#' label='DRINK' />
        </CardActions>
      </Fragment>
    )
  }
}