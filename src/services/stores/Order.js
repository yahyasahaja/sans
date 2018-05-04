//MODULES
import { observable } from 'mobx'
import axios from 'axios'

//CONFIG
import { GRAPHQL_END_POINT } from '../../config'

//ORDER
class Order {
  @observable data = null
  @observable isLoading = false

  getData() {
    this.isLoading = true
    
    axios.post(GRAPHQL_END_POINT, {
      query: `
        query {
          currentOrder {
            id
            total_price
            table_id
            valid_until
            valid
            paid
            order_number
          }
        }
      `
    }).then(({data}) => {
      if (!data) return

      this.data = observable(data.data.currentOrder)
      this.isLoading = false
    }).catch(err => console.log('ERROR WHEN GET ORDER DATA', err))
  }

  setData(data) {
    this.data = observable(data)
  }
}

export default window.order = new Order()