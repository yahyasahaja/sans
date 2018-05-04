//MODULES
import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { observer } from 'mobx-react'
import Input from 'react-toolbox/lib/input'

//ASSETS
import TopBar from '../../components/TopBar'
import LeftBar from '../../components/LeftBar'
import Menu from '../../components/Menu'
import BottomBar from '../../components/BottomBar'

//STYLES
import styles from './css/index.scss'

//STORES
import { cart, user } from '../../services/stores'

//COMPONENT
@observer
class App extends Component {
  componentDidMount() {
    console.log(cart.checkedout)
    if (cart.checkedout)
      this.props.history.push(`/${this.props.match.params.resto_slug}/paymentmethod`)
  }

  state = {
    menu: [],
    selectedMenus: [],
    total: 0,
    item: 0,
    opened: !user.name,
  }

  renderMenu () {
    if (!cart.menus) return

    return _.map(cart.menus, (data, i) => 
      <Menu
        key={i}
        image={data.image}
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
    cart.checkedout
    return (
      <Fragment>
        <div className={styles.container}>
          
          <TopBar />
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

        <div style={{display: this.state.opened ? 'block' : 'none'}} className={styles.overlay} >
          <div className={styles.wrapper} >
            <div className={styles.up} >
              <h1 className={styles.title} >Informasi Pemesan</h1>
              <div className={styles.center} >
                <div>Masukkan Nama: </div>
                <Input 
                  value={user.name}
                  label="Nama Pemesan"
                  required
                  onChange={val => user.name = val}
                />
              </div>

              <span>Nama pemesan digunakan agar mempermudah pelayanan kami kepada pembeli. </span>
            </div>

            <div className={styles.down} >
              <button
                onClick={() => this.setState({opened: false})}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App