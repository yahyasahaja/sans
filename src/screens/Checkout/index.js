//MODULES
import React, { Component, Fragment } from 'react'
import axios from 'axios'

//ASSETS
import TopBar from '../../components/TopBar'

//STYLES
import styles from './css/index.scss'

//COMPONENT
class App extends Component {
  componentDidMount() {
    axios.get('/static/json/menu.json').then(res => {
      this.setState({menu: res.data})
    })
  }

  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          <TopBar
            title={this.props.data.name}
            sub={this.props.data.description}
            status1={this.props.data.status1}
            status2={this.props.data.status2}
          />
          

        </div>
      </Fragment>
    )
  }
}

export default App