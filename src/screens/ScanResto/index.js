//MODULES
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import ProgressBar from 'react-toolbox/lib/progress_bar'

//STYLES
import styles from './css/index.scss'

//ASSETS
import TopBar from '../../components/TopBar'

//CONFIG
import { GRAPHQL_END_POINT } from '../../config'

//STORE
import { token } from '../../services/stores'

//COMPONENT
export default class RestoScan extends Component {
  handleScan = uuid => {
    let { loading } = this.state
    if (uuid) {
      if (loading) return

      this.setState({ loading: true }, () => {
        token.removeToken()

        axios.post(GRAPHQL_END_POINT, {
          query: `
            mutation {
              verifyAndGetRestaurantToken(
                token: "${uuid}"
              ) {
                token
                order {
                  restaurant {
                    slug
                  }
                }
              }
            }
          `
        }).then(({data}) => {
          if (!data) return

          let { verifyAndGetRestaurantToken: {
            order,
            token: orderToken
          }} = data.data
          if (!orderToken) return

          token.setToken(orderToken)
          this.props.history.push(`/${order.restaurant.slug}/scantable`) 
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
    loading: false,
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    // let { name,  } = this.props.data

    return (
      <div className={styles.container} >
        <TopBar
          title='Sans App'
          status1='Login'
          status2='or Sign Up'
        />

        <div className={styles.content} >
          {
            this.state.loading
              ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300}} >
                  <ProgressBar type='circular' mode='indeterminate' multicolor />
                </div>
              )
              : (
                <QrReader
                  delay={this.state.delay}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: '100%', }}
                />
              )
          }
          <h1>Scan a Restaurant QR Code</h1>
        </div>
      </div>
    )
  }
}
