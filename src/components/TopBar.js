import React, { Component } from 'react'
// import { Card } from 'react-toolbox/lib/card'
import { observer } from 'mobx-react'

import styles from './css/TopBar.scss'

import { user, restaurant, order } from '../services/stores'

@observer
class TopBar extends Component {
  render() {
    let { isLoading: isRestoLoading, data: restoData } = restaurant
    let { isLoading: isOrderLoading, data: orderData } = order
    let { title, status1, status2 } = this.props

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.resto}>
            <div className={styles.title}>{title ? title : isRestoLoading ? 'Loading ...' : restoData.name}</div>
            <div className={styles.sub}>{this.props.sub}</div>
          </div>
          <div className={styles.user}>
            <div>{status1 || user.name}</div>
            <div>{status2 !== undefined ? status2 : isOrderLoading || !orderData.table_id ? 'Loading ..' : `No. ${orderData.table_id}` }</div>
          </div>
        </header>
      </div>

    )
  }
}

export default TopBar