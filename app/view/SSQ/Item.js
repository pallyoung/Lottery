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

class Ball extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <View style={{
            height: 30,
            width: 30,
            backgroundColor: this.props.type,
            borderRadius: 100,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}><Text style={{
            color: 'white'
        }}>{this.props.number}</Text></View>
    }
}
class BallList extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var balls = this.props.balls;
        var buleBall = balls.slice(balls.indexOf('+') + 1);
        var redBalls = balls.slice(0, balls.indexOf('+')).split(',');
        var views = [];
        redBalls.forEach((ball, i) => {
            views.push(<Ball type='red' key={'ball' + i} number={ball} />);
        });
        views.push(<Ball type='blue' key={'ball7'} number={buleBall} />);
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                {views}
            </View>);
    }
}
export default class Item extends Component {
    constructor(...props) {
        super(...props);
    }
    _formatOpenTime(opentime) {
        return opentime.slice(0, opentime.indexOf(' '));
    }
    render() {
        let dataSource = this.props.dataSource;
        return (
            <View style={{
                height: 60
            }}>
                <View style={{
                    height: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#ac9b6d'
                    }}>第{dataSource.expect}期  {this._formatOpenTime(dataSource.opentime)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <BallList balls={dataSource.opencode} />
                </View>
            </View>)
    }
}