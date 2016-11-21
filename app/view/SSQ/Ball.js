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
import SSQController from './../../controller/SSQController'

var colorPair = {
    red: '#8f3800',
    blue: '#0166b3'
}

export default class Ball extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        var isSelected = this.props.isSelected;
        return (<TouchableOpacity
            onPress={() => this.props.onPress&&this.props.onPress(this.props.number)}
            activeOpacity = {1}
            style={{
                height: 30,
                width: 30,
                backgroundColor: isSelected ? colorPair[type] : 'white',
                borderRadius: 100,
                marginRight: 10,
                marginBottom: 10,
                borderWidth:1,
                borderColor:colorPair[type],
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}><Text style={{
                color: !isSelected ? colorPair[type] : 'white',
            }}>{this.props.number}</Text></TouchableOpacity>);
    }
}