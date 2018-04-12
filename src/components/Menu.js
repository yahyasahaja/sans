import React, { Component, Fragment } from 'react'
import { IconButton } from 'react-toolbox/lib/button'

import styles from './css/Menu.scss'

import { cart } from '../services/stores'

export default class Menu extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.menu}>
          <div className={styles.box}>
            <div className={styles.left} >
              <div className={styles.img} >
                <img className={styles.imgMenu} src={this.props.image} />
              </div>
              
              <div
                className={styles.desc}
              >
                <div className={styles.title} >
                  {this.props.title}
                </div>
                <div className={styles.sub}>
                  {this.props.sub}
                </div>
                <div className={styles.prices}>
                  {this.props.price}
                </div>
              </div>
            </div>

            <a className={styles.button} onClick={ () => cart.add(this.props.data) } >
              <div className={styles.add}>
                {this.props.quantity}
                <IconButton icon='add' style={{ color: 'green', marginTop: '-5px', marginLeft: '5px' }} />
              </div>
            </a>

          </div>
        </div>
      </Fragment>
    )
  }
}