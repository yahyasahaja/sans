import React, { Component, Fragment } from 'react'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

//Style
import styles from './css/index.scss'

//Asset
import TopBar from '../../components/TopBar'

export default class PaymentMethod extends Component {
  state = {
    value: 'Offline'
  }

  handleChange = (value) => {
    this.setState({value})
  }

  render() {
    let { name,  } = this.props.data

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
            <h1></h1>
            <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
              <RadioButton label='Offline' value='Offline'/>
              <RadioButton label='Online' value='Online'/>
            </RadioGroup>
          </div>

        </div>
      </Fragment>
    )
  }
}