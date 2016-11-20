'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    PixelRatio,
    ScrollView,
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
        return <ScrollView style = {{flex:1,flexDirection:'column',marginHorizontal:16}} >
            <BallSelector type='red'
                onSelect={(select) => {
                    this.red = select;
                } } />
            <View style = {{
                height:2,
                backgroundColor:'#efefef',
                marginVertical:16
            }}/>
            <BallSelector type='blue'
                onSelect={(select) => {
                    this.blue = select[0];
                } } />
        </ScrollView>
    }

}