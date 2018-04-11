import React, { Component, Fragment } from 'react'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

//Style
import styles from './css/index.scss'
import theme from './css/offline.scss'
import theme2 from './css/online.scss'

//Asset
import TopBar from '../../components/TopBar'
import ButtonBottom from '../../components/ButtonBottom'

export default class PaymentMethod extends Component {
  state = {
    value: 'Offline'
  }

  handleChange = (value) => {
    this.setState({value})
  }

  render() {
    let { name,  } = this.props.data
    let toLink = `/${this.props.match.params.resto_slug}/detailorder`

    return (
      <Fragment>
        <div className={styles.container}>
          <TopBar
            title={name}
            sub={this.props.data.description}
            status1={this.props.data.status1}
            status2={this.props.data.status2}
          />

          <div className={styles.content} >
            <h1 className={styles.header} >
              Pilih Metode Pembayaran Anda
            </h1>
            <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
              <RadioButton label='OFFLINE via Cashier' value='Offline' theme={theme} />
              <RadioButton label='ONLINE by OVO' value='Online' theme={theme2} />
            </RadioGroup>
          </div>

          <ButtonBottom
            {... this.props}
            link= {toLink}
            name= 'NEXT'
          />          

        </div>
      </Fragment>
    )
  }
}