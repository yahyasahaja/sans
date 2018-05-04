//MODULES
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import QRCode from 'qrcode.react'

//ASSETS
import TopBar from '../../components/TopBar'

//STYLES
import styles from './css/index.scss'

//STORES
import { user, cart, order } from '../../services/stores'

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
          <TopBar />

          <div className={styles.content} >
            <div><h1>Lakukan Pembayaran Sekarang ke Kasir</h1></div>

            <div className={styles.qrcode} >
              <QRCode style={{width: 230, height: 230}} value="SC001" />
            </div>

            <div className={styles.status1} >
              <div>Nomor Pemesanan:</div>
              <div style={{fontWeight: '900'}} >SC001</div>
            </div>
            
            <div className={styles.status2} >
              <div>Mr/Mrs. {user.name}</div>
              <div>No Meja {order.data.table_id}</div>
            </div>

            <div className={styles.status3} >
              <div>Total Biaya Pesanan:</div>
              <div>Rp {cart.totalPrice}</div>
            </div>
            <div className={styles.add} >+ Tambah Pesanan</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App