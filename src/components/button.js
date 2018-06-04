import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types'
import FlipcardContext from '../context/flipcard'

class Button extends Component {
        static propTypes = {
                value: PropTypes.string,
                color: PropTypes.string,
                handleClick: PropTypes.any
        }

        render() {
                return (
                        <View>
                                <FlipcardContext.Consumer>
                                        {
                                                context => {
                                                                let activeOpacity, backgroundColor, onPress
                                                                
                                                                if( this.props.value == "Start Game" ) {
                                                                        activeOpacity = (context.isStarted) ? 1 : 0.5
                                                                        backgroundColor = (context.isStarted) ? "#2c3e50" : this.props.color
                                                                        onPress = (context.isStarted) ? () => {} : this.props.handleClick.bind(this)
                                                                }

                                                                if( this.props.value == "Reset Game" ) {
                                                                        activeOpacity = (!context.isStarted) ? 1 : 0.5
                                                                        backgroundColor = (!context.isStarted) ? "#2c3e50" : this.props.color
                                                                        onPress = (!context.isStarted) ? () => {} : this.props.handleClick.bind(this)
                                                                }

                                                                return (
                                                                        <TouchableHighlight 
                                                                        style={[styles.btnWrapper, {backgroundColor}]}
                                                                        onPress={onPress}   
                                                                        activeOpacity={activeOpacity}     
                                                                        >
                                                                                <Text style={styles.txtStyle} >
                                                                                        { this.props.value }
                                                                                </Text>
                                                                        </TouchableHighlight>
                                                                )
                                                }
                                        }
                                </FlipcardContext.Consumer>
                        </View>
                )
        }
}

const styles = StyleSheet.create({
        btnWrapper: { 
                height:60,
                width: 100,
                margin: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
        },
        txtStyle: {
                fontSize:14,
                color: 'white'
        }
})

export default Button