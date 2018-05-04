//MODULES
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'
import ProgressBar from 'react-toolbox/lib/progress_bar' 

//ASSETS
import TopBar from '../../components/TopBar'

//STYLES
import styles from './css/index.scss'

//STORE
import { cart } from '../../services/stores'
import { GRAPHQL_END_POINT } from '../../config'

//COMPONENT
@observer
class App extends Component {
  componentDidMount() {
    console.log(cart.checkedout)
    if (cart.checkedout)
      this.props.history.push(`/${this.props.match.params.resto_slug}/paymentmethod`)
  }
  
  note = []

  state = {
    loading: false
  }

  renderList() {
    if (cart.isLoading) return

    return cart.menus.slice().map((data, i) => {
      if (!data.quantity) return
      return (
        <div key={i} className={styles.list} >
          <div className={styles.left} >
            <img src={data.image} alt="Product Image" />
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
                        cart.menus[i].note = ''
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
                          cart.menus[i].note = value
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
        <TopBar />

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
            {
              this.state.loading
                ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }} >
                    <ProgressBar type='circular' mode='indeterminate' multicolor />
                  </div>
                )
                : (
                  <button
                    onClick={() => {
                      this.setState({loading: true})

                      let items = cart.menus.map(({ id, quantity, note }) => {
                        if (!note) note = ''
                        if (!quantity) quantity = 0
                        return { quantity, menu_id: id, note }
                      })

                      items = items.filter(d => d.quantity !== 0)
                      items = JSON.stringify(items).replace(/"([^(")"]+)":/g, '$1:')

                      axios.post(GRAPHQL_END_POINT, {
                        query: `
                          mutation {
                            updateOrder(items: ${items}) {
                              total_price
                              restaurant {
                                name
                              }
                              order_items {
                                restaurant_menu {
                                  name
                                }
                              }
                              paid
                              id
                              valid
                            }
                          }
                        `
                      }).then(({ data }) => {
                        this.setState({loading: false})
                        if (!data) return
                        
                        cart.checkedout = true
                        this.props.history.push(`/${this.props.match.params.resto_slug}/paymentmethod`)
                      }).catch(err => {
                        console.log('ERROR WHEN UPDATE POST', err)
                        this.setState({loading: false})
                      })

                    }}
                  >
                    Order & Payment
                  </button>
                )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App