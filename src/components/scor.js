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
          { (context) => <Text>Scores : { context.score }</Text> }
        </FlipcardContext.Consumer>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  
});
