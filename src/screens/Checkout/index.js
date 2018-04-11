import React, { Component, Fragment } from 'react'

//Style
import styles from './css/index.scss'

export default class PaymentMethod extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          Checkout
        </div>
      </Fragment>
    )
  }
}