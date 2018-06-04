import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FlipcardContext from '../context/flipcard'

export default class App extends Component {

  render() {
    return (
      <View>
        <FlipcardContext.Consumer>
          { (context) => <Text style={styles.txtScore}>Score : { context.score }</Text> }
        </FlipcardContext.Consumer>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  txtScore: {
    fontSize: 30,
    marginTop: 10,
  }
});
