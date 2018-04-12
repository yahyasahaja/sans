import { observable, action } from 'mobx'

class User {
  @observable name = ''
  @observable table = ''

  @action
  setData(data) {
    this.data = observable(data)
  }
}

export default new User()