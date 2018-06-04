import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import Scor from '../components/scor'
import Card from '../components/card'
import { shuffle } from 'lodash'
import { CorrectSound } from '../utils/sound'

import FlipcardContext from '../context/flipcard'

import Button from '../components/button'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isEnabled: true,
      values: [],
      active: [],
      completed: 0,
      score: 0,
      items: [],
      cardTapped: async (index, value) => {

        // if isEnabled == false
        if(!this.state.isEnabled){
          return false
        }

        // asign items by index to item var
        let item = await this.state.items[index]

        //set current card to active
        await this.state.setActive(item)

        // clone items state 
        var clone = this.state.items.slice(0)
          
        // set propery `isOpened` = true in current card in state `items`
        // -> menandakan bahwa kartu terbuka
        clone[index].isOpened = true
          
        // set state items dengan items yang baru dirubah tadi
        await this.setState({
          items: clone
        })
      
        // jika kartu yg terbuka > 1
        if( this.state.active.length > 1 ) {
          
          //pencocokan kartu
          //jika kartu yg `pertama` sama dengan kartu `kedua`
          if ( this.state.active[0].value ==  this.state.active[1].value) {
            
              //putar musik berhasil
              CorrectSound.play()

              //jalankan method setScore, score akan bertambah satu
              await this.state.setScore()

              //hapus kartu yang aktif
              await this.state.destroyActive()
            
          } 
          
          // jika tidak
          else {

            // set state `isEnabled` menjadi false
            // -> agar kartu lain tidak bisa di klik
            await this.setState({
              isEnabled: false
            })

            // kasih timeout kartu akan ditutup kembali
            await setTimeout(async () => {
              var clone =  this.state.items.slice(0)
              clone[this.state.active[0].key].isOpened = false;
              clone[this.state.active[1].key].isOpened = false;
              await this.state.destroyActive()
              await this.setState({
                isEnabled: true
              })
            }, 500)      
          }

          // await this.state.destroyActive()
          
        }

        // console.log(this.state)
      },
      setScore: async () => {
        await this.setState({score: this.state.score + 1})
      },
      setActive: async (value) => {
        await this.setState({
          active: [...this.state.active, value]
        })
      },
      destroyActive: () => {
        this.setState({
          active: []
        })
      }
    }
  }

  async componentWillMount() {
    await this._loadValues()
    // await this._loadItems()
  }

  async _loadValues() {
    let values = ["🥕", "🍔", "🍍", "🍠", "🌮", "🏀", "🎮", "🎧"].map(i => {
                      return [i, i]
                  })
                  .reduce((a, b) => {
                    return a.concat(b)
                  });

    values = shuffle(values)

    let items = values.map((value, key) => {
      return {
        isOpened: false,
        isMatched: false,
        key,
        value
      }
    })

    this.setState({
      values,
      items
    })
  }

  async _loadItems() {
    let items = this.state.values.map((value, key) => {
      return {
        isOpened: false,
        isMatched: false,
        key,
        value
      }
    })

    // console.log(items)

    // itemsState = {
    //   isOpen: false,
    //   isMatched: false,
    // }

    // let arr = Array(this.state.items.length).fill(itemsState)
    await this.setState({
      items
    })
  }

  render() {
    let cards = this.state.values.map((val, key) => (
      <Card 
        key={key}
        index={key}
        value={val}
        isOpened={false}
        isMatched={false}
      />
    ))

    const view = (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Scor />
        </View>
        
        <View style={{
          flex: 5,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          { cards }
        </View>

        <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
           
          <Button value="Start Game" color="#27ae60" handleClick={() => { Alert.alert("start") }} />
          <Button value="Reset Game" color="#c0392b" handleClick={() => { Alert.alert("reset") }} />
        
        </View>
      </View>
    );

    return (
      <FlipcardContext.Provider value={this.state} >
          {view}
      </FlipcardContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
