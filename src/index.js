import React, { Component } from 'react';
import FlipcardContext from '../context/flipcard'

export default class App extends Component {
        render() {
                const { children } = this.props
                return (
                        <FlipcardContext>
                                {children}
                        </FlipcardContext>
                )
        }
}