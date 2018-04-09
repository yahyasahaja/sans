//MODULES
import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import axios from 'axios'

//ASSETS
import TopBar from '../../components/TopBar'
import LeftBar from '../../components/LeftBar'
import Menu from '../../components/Menu'
import BottomBar from '../../components/BottomBar'

//STYLES
import styles from './css/index.scss'

//COMPONENT
class App extends Component {
  componentDidMount() {
    axios.get('/static/json/menu.json').then(res => {
      this.setState({menu: res.data})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      title: 'Sans Resto',
      sub: 'Jalan Veteran Nomor 10, Malang (083243785475)',
      status1: 'Mr. Zain',
      status2: 'No. 14',
      image: '/static/img/sate.png',
      menu: null,
      selectedMenus: []
    }
  }

  toggleAdd = (menu) => {
    let { selectedMenus } = this.state
    let exist = false
    let indexToBeDeleted
    console.log('AWAL', selectedMenus)

    for (let i in selectedMenus) {
      if (selectedMenus[i].id === menu.id) {
        exist = true
        indexToBeDeleted = i
        break
      }
    }
    console.log('ATAS', selectedMenus, [...selectedMenus, menu])
    if (!exist)
      this.setState({selectedMenus: [...selectedMenus, menu]})
    else {
      selectedMenus.splice(indexToBeDeleted, 1)
      this.setState({selectedMenus: selectedMenus.slice()})
    }

    console.log([...selectedMenus, menu])
  }

  renderMenu () {
    if (!this.state.menu) return

    return _.map(this.state.menu, (data, i) => 
      <Menu
        key={i}
        image={data.image_url}
        title={data.name}
        sub={data.description}
        add={data.add}
        price={data.price}
        data={data}
        toggleAdd={this.toggleAdd}
      />
    )
  }

  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          
          <TopBar
            title={this.state.title}
            sub={this.state.sub}
            status1={this.state.status1}
            status2={this.state.status2}
          />

          <LeftBar />

          <div className={styles.content} >
            {this.renderMenu()}
          </div>
          
          <BottomBar 
            image={this.state.image}
          />

        </div>
      </Fragment>
    )
  }
}

export default App