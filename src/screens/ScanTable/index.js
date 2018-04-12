//MODULES
import React, { Component, Fragment } from 'react'
import QrReader from 'react-qr-reader'

//STYLES
import styles from './css/index.scss'

//ASSETS
import TopBar from '../../components/TopBar'

//COMPONENT
export default class RestoScan extends Component {
  handleScan = data => {
    if (data) {
      console.log(data)
      this.setState({
        result: data,
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
    let { name,  } = this.props.data

    return (
      <Fragment>
        <TopBar
          title={name}
        />

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
