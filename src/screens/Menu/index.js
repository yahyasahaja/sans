//MODULES
import React, { Component } from 'react'
import Link from 'react-toolbox/lib/link'
import { CardActions } from 'react-toolbox/lib/card'
import { IconButton } from 'react-toolbox/lib/button'

//ASSETS
import TopBar from '../../components/TopBar'

//STYLES
import styles from './css/index.scss'

//COMPONENT
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Sans Resto',
      sub: 'Jalan Veteran Nomor 10, Malang (083243785475)',
      status1: 'Mr. Zain',
      status2: 'No. 14',
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <TopBar
          title={this.state.title}
          sub={this.state.sub}
          status1={this.state.status1}
          status2={this.state.status2}
        />
        <hr />
        <div className={styles.content} >
          <CardActions className={styles.leftBar} >
            <Link className={styles.categories} href='#' active label='Special' />
            <Link className={styles.categories} href='#' label='Soups' />
            <Link className={styles.categories} href='#' label='Pasta' />
          </CardActions>

          <div className={styles.menu}>
            <div className={styles.box}>
              <div
                className={styles.title}
              >
                <img className={styles.imgMenu} src="https://placeimg.com/80/80/animals" />
                Sate Ayam
                <div
                  className={styles.sub}
                >
                  10 tusuk
                </div>
                <div
                  className={styles.prices}
                >
                  Rp. 15.000
                </div>
              </div>
              <div className={styles.add}>
                1
                <IconButton icon='add' style={{ color: 'green', marginTop: '-5px', marginLeft: '5px' }} />
              </div>
            </div>

            <div className={styles.box}>
              <div
                className={styles.title}
              >
                <img className={styles.imgMenu} src="https://placeimg.com/80/80/animals" />
                Sate Ayam
                <div
                  className={styles.sub}
                >
                  10 tusuk
                </div>
                <div
                  className={styles.prices}
                >
                  Rp. 15.000
                </div>
              </div>
              <div className={styles.add}>
                1
                <IconButton icon='add' style={{ color: 'green', marginTop: '-5px', marginLeft: '5px' }} />
              </div>
            </div>

            <div className={styles.box}>
              <div
                className={styles.title}
              >
                <img className={styles.imgMenu} src="https://placeimg.com/80/80/animals" />
                Sate Ayam
                <div
                  className={styles.sub}
                >
                  10 tusuk
                </div>
                <div
                  className={styles.prices}
                >
                  Rp. 15.000
                </div>
              </div>
              <div className={styles.add}>
                1
                <IconButton icon='add' style={{ color: 'green', marginTop: '-5px', marginLeft: '5px' }} />
              </div>
            </div>

          </div>

        </div>


      </div>
    )
  }
}

export default App