import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types'

class Button extends Component {
        static propTypes = {
                value: PropTypes.string,
                color: PropTypes.string,
                handleClick: PropTypes.any
        }

        render() {
                return (
                        <View>
                                <TouchableHighlight 
                                        style={[styles.btnWrapper, {backgroundColor: this.props.color}]}
                                        onPress={this.props.handleClick.bind(this)}        
                                >
                                        <Text style={styles.txtStyle} >
                                                { this.props.value }
                                        </Text>
                                </TouchableHighlight>
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