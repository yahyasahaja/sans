//MODULES
import React, { Component } from 'react'
import { observer } from 'mobx-react'

//ASSETS
import TopBar from '../../components/TopBar'

//STYLES
import styles from './css/index.scss'

//STORE
import { cart } from '../../services/stores'

//COMPONENT
@observer
class App extends Component {
  note = []

  renderList() {
    return cart.data.slice().map((data, i) => {
      if (!data.quantity) return
      return (
        <div key={i} className={styles.list} >
          <div className={styles.left} >
            <img src={data.image_url} alt="Product Image" />
          </div>

          <div className={styles.right} >
            <div className={styles.up} >
              <span className={styles.name}>
                {data.name}
              </span>

              <div className={styles.qty} >
                <span className={styles.quantity} >
                  {data.quantity}

                  <div 
                    className={styles.minus}
                    onClick={() => cart.remove(data)}
                  >
                    -
                  </div>
                </span>

                <span className={styles.price} >
                  Rp {data.price}
                </span>
              </div>
            </div>

            <div className={styles.down} >
              {
                data.note === undefined
                  ? (
                    <span
                      className={styles['add-note']}
                      onClick={() => {
                        cart.data[i].note = ''
                        this.forceUpdate(() => this.note[i].focus())
                      }}
                    >
                      +Notes this menu
                    </span>
                  )
                  : (
                    <div className={styles.note} >
                      <textarea ref={el => this.note[i] = el}
                        placeholder="Note this menu ..." rows="2"
                        value={data.note || ''}
                        onChange={e => {
                          let value = e.target.value
                          cart.data[i].note = value
                          this.forceUpdate()
                        }}
                      />
                    </div>
                  )
              }

            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <TopBar
          title={this.props.data.name}
          sub={this.props.data.description}
          status1={this.props.data.status1}
          status2={this.props.data.status2}
        />

        <div className={styles.content} >
          {this.renderList()}
        </div>

        <div className={styles['bottom-bar']} >
          <div className={styles.up} >
            <div
              className={styles['menu-button']}
              onClick={() => {
                this.props.history.push(`/${this.props.match.params.resto_slug}/menu`)
              }}
            >
              {'< back to menu'}
            </div>

            <div className={styles.right}>
              <span>{cart.totalItem} Item</span>
              <span>Rp {cart.totalPrice}</span>
            </div>
          </div>

          <div className={styles.down} >
            <button
              onClick={() => {
                this.props.history.push(`/${this.props.match.params.resto_slug}/paymentmethod`)
              }}
            >
              Order & Payment
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App