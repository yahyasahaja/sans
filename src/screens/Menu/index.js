//MODULES
import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { observer } from 'mobx-react'

//ASSETS
import TopBar from '../../components/TopBar'
import LeftBar from '../../components/LeftBar'
import Menu from '../../components/Menu'
import BottomBar from '../../components/BottomBar'

//STYLES
import styles from './css/index.scss'

//STORES
import { cart } from '../../services/stores'

//COMPONENT
@observer
class App extends Component {
  componentDidMount() {
    axios.get('/static/json/menu.json').then(({data}) => {
      if (data)
        cart.data = data
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

  renderMenu () {
    if (!cart.data) return

    return _.map(cart.data, (data, i) => 
      <Menu
        key={i}
        image={data.image_url}
        title={data.name}
        sub={data.description}
        add={data.add}
        quantity={data.quantity}
        price={data.price}
        data={data}
      />
    )
  }

  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          
          <TopBar
            title={this.cart.name}
            sub={this.cart.description}
            status1={this.state.status1}
            status2={this.state.status2}
          />

          <LeftBar />

          <div className={styles.content} >
            {this.renderMenu()}
          </div>
          
          <BottomBar 
            image={this.state.image}
            price={cart.totalPrice}
            item={cart.totalItem}
            {... this.props}
          />

        </div>
      </Fragment>
    )
  }
}

export default App