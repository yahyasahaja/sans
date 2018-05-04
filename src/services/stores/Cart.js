//MODULES
import { observable, computed } from 'mobx'

//STORE
import restaurant from './Restaurant'

class Cart {
  @observable menus = null
  @observable checkedout = false

  indexOf(menu) {
    let menus = this.menus.slice()
    for (let i in menus) 
      if (menus[i].id == menu.id)
        return i
  }

  add(menu) {
    let selectedMenus = this.menus.slice()
    let indexToBeAdded = this.indexOf(menu)
    
    if (selectedMenus[indexToBeAdded].quantity === undefined) selectedMenus[indexToBeAdded].quantity = 1
    else selectedMenus[indexToBeAdded].quantity++
    
    this.menus = observable(selectedMenus.slice())
  }

  remove(menu) {
    let selectedMenus = this.menus.slice()
    let indexToBeRemoved = this.indexOf(menu)

    selectedMenus[indexToBeRemoved].quantity--
    if (selectedMenus[indexToBeRemoved].quantity === 0) selectedMenus[indexToBeRemoved].quantity = null
    this.menus = observable(selectedMenus.slice())
  }

  @computed
  get totalPrice() {
    if (!this.menus) return 0
    return this.menus.slice().reduce((prev, cur) => prev + cur.price * (cur.quantity || 0), 0)
  }
  
  @computed
  get totalItem() {
    if (!this.menus) return 0
    return this.menus.slice().reduce((prev, cur) => prev + (cur.quantity || 0), 0)
  }

  @computed
  get isLoading() {
    return restaurant.isLoading
  }
}

export default new Cart()