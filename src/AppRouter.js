//MODULES
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

//SCREENS
import Menu from './screens/Menu'
import ScanResto from './screens/ScanResto'
import ScanTable from './screens/ScanTable'
// import Home from './screens/Home'
import Checkout from './screens/Checkout'
import PaymentMethod from './screens/PaymentMethod'
import DetailOrder from './screens/DetailOrder'

//STYLES
import styles from './app-router.scss'

//CONFIG
import { order, restaurant } from './services/stores'

//COMPONENT
@observer
class RestoComponent extends Component {
  renderRoute() {
    let loading = order.isLoading || restaurant.isLoading
    let data = order.data
    
    //if loading, show splashscreen
    if (loading) return (
      <div style={{
        width: '100%',
        maxWidth: '480px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <img style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}} src="/static/img/bg.png" alt=""/>
        <div style={{width: '100%', minHeight: '100vh', background: 'black', opacity: .5, position: 'absolute'}} />
        <span style={{position: 'absolute', color: 'white', fontSize: '30pt', fontWeight: 900}} >CAFETARIA UB</span>
      </div>
    )

    if (!data) return <span>404 not found</span>

    return (
      <Switch>
        <Route
          path="/:resto_slug/scantable"
          render={props => <ScanTable {...props} />}
        />

        <Route
          path="/:resto_slug/menu"
          render={props => <Menu {...props} />}
        />

        <Route
          path="/:resto_slug/checkout"
          render={props => <Checkout {...props} />}
        />

        <Route
          path="/:resto_slug/paymentmethod"
          render={props => <PaymentMethod {...props} />}
        /> 
 
        <Route 
          path="/:resto_slug/detailorder"
          render={props => <DetailOrder {...props} />}
        /> 
 
      </Switch>
    )
  }

  render() {
    return (
      <div className={styles.container} >
        {this.renderRoute()}
      </div>
    )
  }
}

export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect path="/home" to="/" />
          <Route path="/:resto_slug" component={RestoComponent} />
          <Route
            path="/"
            render={props => <ScanResto {...props} />}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}