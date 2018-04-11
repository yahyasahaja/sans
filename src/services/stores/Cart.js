//MODULES
import { observable, computed } from 'mobx'

class Cart {
  @observable data = []

  indexOf(menu) {
    let menus = this.data.slice()
    for (let i in menus) 
      if (menus[i].id == menu.id)
        return i
  }

  add(menu) {
    let selectedMenus = this.data.slice()
    let indexToBeAdded = this.indexOf(menu)
    
    if (selectedMenus[indexToBeAdded].quantity === null) selectedMenus[indexToBeAdded].quantity = 1
    else selectedMenus[indexToBeAdded].quantity++
    this.data = observable(selectedMenus.slice())
  }

  remove(menu) {
    let selectedMenus = this.data.slice()
    let indexToBeRemoved = this.indexOf(menu)

    selectedMenus[indexToBeRemoved].quantity--
    if (selectedMenus[indexToBeRemoved].quantity === 0) selectedMenus[indexToBeRemoved].quantity = null
    this.data = observable(selectedMenus.slice())
  }

  @computed
  get totalPrice() {
    return this.data.reduce((prev, cur) => prev + cur.price * cur.quantity, 0)
  }
  
  @computed
  get totalItem() {
    return this.data.reduce((prev, cur) => prev + cur.quantity, 0)
  }
}

export default new Cart()