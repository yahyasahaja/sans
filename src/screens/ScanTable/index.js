//MODULES
import React, { Component, Fragment } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'

//STYLES
import styles from './css/index.scss'

//ASSETS
import TopBar from '../../components/TopBar'

//CONFIG
import { GRAPHQL_END_POINT } from '../../config'

//STORES
import { order, cart } from '../../services/stores'

//COMPONENT
export default class RestoScan extends Component {
  componentDidMount() {
    if (cart.checkedout)
      this.props.history.push(`/${this.props.match.params.resto_slug}/paymentmethod`)
  }

  handleScan = table_id => {
    let { loading } = this.state
    if (table_id) {
      if (loading) return

      this.setState({ loading: true }, () => {
        axios.post(GRAPHQL_END_POINT, {
          query: `
            mutation {
              verifyTable(table_id: "${table_id}") 
            }
          `
        }).then(({data}) => {
          if (!data) return

          let isExist = data.data.verifyTable
          console.log(isExist)
          order.getData()
          this.props.history.push(`/${this.props.match.params.resto_slug}/menu`) 
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }

  state = {
    delay: 300,
    result: 'No result',
    status1: 'Mr. Zain',
    status2: 'No. 14',
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    cart.checkedout
    return (
      <Fragment>
        <TopBar status2="" />

        <div className={styles.container} >
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%', }}
          />
          <h1>Scan a Table QR Code</h1>
        </div>
      </Fragment>
    )
  }
}
