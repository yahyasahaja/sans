//MODULES
import { observable } from 'mobx'
import axios from 'axios'

//CONFIG
import { GRAPHQL_END_POINT } from '../../config'

//STORE
import cart from './Cart'

//ORDER
class Restaurant {
  @observable data = null
  @observable isLoading = false

  getData() {
    this.isLoading = true
    
    axios.post(GRAPHQL_END_POINT, {
      query: `
        query {
          currentRestaurant {
            id
            name
            menus {
              id
              name
              description
              price
              image 
              categories {
                id
                name
              }
            }
            picture
            verification_token
            slug
          }
        }
      `
    }).then(({data}) => {
      if (!data) return
      data = data.data.currentRestaurant

      this.data = observable(data)
      this.isLoading = false
      cart.menus = data.menus.slice()
    }).catch(err => console.log('ERROR WHEN GET RESTAURANT DATA', err))
  }

  setData(data) {
    this.data = observable(data)
  }
}

export default window.resto = new Restaurant()