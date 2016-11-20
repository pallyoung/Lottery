'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import mlux from 'mlux';
var Binder = mlux.Binder;
import BallSelector from './BallSelector';

export default class BuyLottery extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
        return <View >
            <BallSelector type='red'
                onSelect={(select) => {
                    this.red = select;
                } } />
            <BallSelector type='blue'
                onSelect={(select) => {
                    this.blue = select[0];
                } } />
        </View>
    }

}