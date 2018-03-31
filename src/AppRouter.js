//MODULES
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

//SCREENS
import Home from './screens/Home'

//CONFIG
import {
  TOKEN_ADDRESS,
  END_POINT_URL,
} from './config'

//COMPONENT
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
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}