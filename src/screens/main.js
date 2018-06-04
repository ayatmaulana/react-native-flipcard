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
import Button from '../components/button'

import { shuffle } from 'lodash'
import { CorrectSound } from '../utils/sound'

import FlipcardContext from '../context/flipcard'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isStarted: false,
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
        }
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
      },
      resetGame: () => {
        this.setState({
          isStarted: false,
          score: 0,
          active: []
        })

        this._loadValues(0)
      },
      startGame: () => {
        this.setState({
          isStarted: true
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

    await this.setState({
      items
    })
  }

  _resetGame(){
    Alert.alert(
      "Reset Game !",
      "Are You Sure ?",
      [
        {text: "Cancel", onPress: () => {  }, style: 'cancel'},
        {text: "Ok", onPress: () => { 
          this.state.resetGame()
         }
        }
      ],
      { cancelable: true }
    )
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
      <View style={styles.gameContainer}>
        <View style={{flex: 1}}>
          <Scor />
        </View>
        
        <View style={styles.cardsContainer}>
          { cards }
        </View>

        <View style={styles.actionButtonContainer}>
           
          <Button value="Start Game" color="#27ae60" handleClick={() => { this.state.startGame() }} />
          <Button value="Reset Game" color="#c0392b" handleClick={this._resetGame.bind(this)}/>
        
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
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardsContainer: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButtonContainer: {
    flex: 1, 
    flexDirection: 'row', 
    paddingTop: 10
  }
});
