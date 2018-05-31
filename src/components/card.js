import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import { TapSound } from '../utils/sound'
// import FlipcardStore from '../stores/flipcard'
import FlipCardContext from '../context/flipcard'

export default class App extends Component {

  static propTypes = {
    index: PropTypes.number,
    value: PropTypes.string,
    isOpened: PropTypes.bool,
    isMatched:PropTypes.bool,
  }

  constructor(props){
    super(props)    
    // this.state = {
    //   isOpened: false,
    // }
  }

  async _onPress(context) {
    let  value = this.props.value,
    index = this.props.index

    // let current = context.items[index]
    // current.isOpened = true
    
    // this.props.isOpened = true

    context.cardTapped(index, value)
  
    
    // this.setState({
    //   isOpened: true
    // })

    if (!this.props.isOpened) {
      TapSound.play();
    }
  }

  render() {
  

    // const txtCard = !this.state.isOpened ? ( <Text style={styles.cardText}>?</Text> ) : ( <Text style={styles.cardText}>{this.props.value}</Text> )
    // const backgroundColor = !this.state.isOpened ? 'yellow' : 'skyblue';
    // const activeOpacity = !this.state.isOpened ? 0 : 1

    const index = this.props.index
    return (
      <View style={styles.cardWrapper}>
        <FlipCardContext.Consumer>
          { (context) => {

              let current = context.items[index]
              // console.log(context.items)
              let txtCard = (!current.isOpened) ? ( <Text style={styles.cardText}>?</Text> ) : ( <Text style={styles.cardText}>{this.props.value}</Text> )
              let backgroundColor = (!current.isOpened) ? 'yellow' : 'skyblue';
              let activeOpacity = (!current.isOpened) ? 0.5 : 1
              let onPress = (!current.isOpened) ? this._onPress.bind(this,context) : () => {};

              return (
                <TouchableOpacity
                activeOpacity={activeOpacity}
                style={ [styles.cardTouchable, { backgroundColor }]}
                onPress={onPress}
                >
                  <Text>{txtCard}</Text>
                </TouchableOpacity>
              )

          } }
        </FlipCardContext.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 5
  },
  cardTouchable: {
    width: 80, 
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  cardText: {
    fontSize: 60,
  }
});
