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
  }

  constructor(props){
    super(props)    
  }

  async _onPress(context) {
    let  value = this.props.value,
    index = this.props.index

    context.cardTapped(index, value)

    if (!this.props.isOpened) {
      TapSound.play();
    }
  }

  render() {

    const index = this.props.index
    return (
      <View style={styles.cardWrapper}>
        <FlipCardContext.Consumer>
          { (context) => {

              let current = context.items[index]
            
              let txtCard = (!current.isOpened) ? ( <Text style={styles.cardText}>?</Text> ) : ( <Text style={styles.cardText}>{this.props.value}</Text> )

              console.log(context.isStarted)

              var backgroundColor, activeOpacity, onPress
              if(context.isStarted == true){
                backgroundColor = (!current.isOpened) ? '#f1c40f' : '#3498db';
                activeOpacity = (!current.isOpened) ? 0.5 : 1
                onPress = (!current.isOpened) ? this._onPress.bind(this,context) : () => {};
              } else{
                backgroundColor = "#2c3e50";
                activeOpacity = 1
                onPress = () => {}
              }
              
   

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
