//MODULES
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'

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
import {
  TOKEN_ADDRESS,
  END_POINT_URL,
} from './config'

//COMPONENT
class RestoComponent extends Component {
  componentWillReceiveProps(nextProps) {
    this.checkForSlugUpdate(nextProps.match.params.resto_slug)
  }

  componentDidMount() {
    console.log(this.props)
    this.checkForSlugUpdate(this.props.match.params.resto_slug)
  }

  checkForSlugUpdate(resto_slug) {
    if (resto_slug == this.state.resto_slug) return

    this.setState({ loading: true }, async () => {
      let { data } = await axios.get(`/static/json/${resto_slug}.json`)
      setTimeout(() => {
        this.setState({next: true})
      }, 2000)
      this.setState({ data, loading: false, resto_slug })
    })
  }

  state = {
    resto_slug: '',
    data: null,
    loading: true,
    next: false
  }

  renderRoute() {
    let { data, loading, next } = this.state

    //if loading, show splashscreen
    if (loading || !next) return (
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
          render={props => <ScanTable {...props} data={data} />}
        />

        <Route
          path="/:resto_slug/menu"
          render={props => <Menu {...props} data={data} />}
        />

        <Route
          path="/:resto_slug/checkout"
          render={props => <Checkout {...props} data={data} />}
        />

        <Route
          path="/:resto_slug/paymentmethod"
          render={props => <PaymentMethod {...props} data={data} />}
        />

        <Route
          path="/:resto_slug/detailorder"
          render={props => <DetailOrder {...props} data={data} />}
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
  componentWillMount() {
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.baseURL = END_POINT_URL
    if (localStorage.getItem(TOKEN_ADDRESS))
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(TOKEN_ADDRESS)
  }

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