//MODULES
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-css-themr'

//CSS
import theme from './assets/css/theme.scss'

//ROUTER
import AppRouter from './AppRouter'

const contextTheme = {
  RTInput: theme
}

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <ThemeProvider theme={contextTheme}>
        <AppRouter />
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)