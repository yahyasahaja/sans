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
      menu: [],
      selectedMenus: [],
      total: 0,
      item: 0
    }
  }

  toggleAdd(menu) {
    let { selectedMenus } = this.state
    let exist = false
    let indexToBeAdded = null

    for (let i in selectedMenus) {
      console.log('Salah')
      if (selectedMenus[i].id === menu.id) {
        console.log('Bener')
        exist = true
        indexToBeAdded = i
        break
      }
    }
     
    if (!exist) {
      console.log('0')
      menu.quantity = 1
      this.setState({selectedMenus: [...selectedMenus, menu]})

      //Total
      this.setState((prev) => ({
        total: prev.total + menu.price
      })) 

      //Item
      this.setState((prev) => ({
        item: prev.item+1
      })) 

    } else {
      console.log('+1')
      selectedMenus[indexToBeAdded].quantity++
      this.setState({selectedMenus: selectedMenus.slice()})
      
      //Total
      this.setState((prev) => ({
        total: prev.total + menu.price
      })) 

      //Item
      this.setState((prev) => ({
        item: prev.item+1
      })) 
    }
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
        quantity={data.quantity}
        price={data.price}
        data={data}
        toggleAdd={this.toggleAdd.bind(this)}
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
            price={this.state.total}
            item={this.state.item}
            {... this.props}
          />

        </div>
      </Fragment>
    )
  }
}

export default App