//MODULES
import { observable, computed } from 'mobx'
import axios from 'axios'

//STORE
import { TOKEN_URL } from '../../config'

//STORE
import order from './Order'
import restaurant from './Restaurant'

//STORE
class Token {
  constructor() {
    let raw = localStorage.getItem(TOKEN_URL)

    axios.defaults.headers.post['Content-Type'] = 'application/json'
    if (raw) this.setToken(raw)
  }

  @observable raw = ''

  setToken(token) {
    this.raw = token
    axios.defaults.headers['Authorization'] = this.formatted
    localStorage.setItem(TOKEN_URL, this.raw)
    order.getData()
    restaurant.getData()
  }

  @computed
  get formatted() {
    return `Bearer ${this.raw}`
  }

  removeToken() {
    delete axios.defaults.headers['Authorization']
    localStorage.removeItem(TOKEN_URL)
  }
}

export default new Token()