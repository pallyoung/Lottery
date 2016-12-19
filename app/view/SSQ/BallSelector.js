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
import Binder from 'react-mlux-binder';
import SSQController from './../../controller/SSQController'
import Ball from './Ball';
var colorPair = {
    red: '#8f3800',
    blue: '#0166b3'
}

var titlePair = {
    red: '红球',
    blue: '蓝球'
}

class BaseBallSelector extends Component {
    constructor(...props) {
        super(...props);
        this.select = this.props.select;

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.select!=this.props.select){
            this.select = nextProps.select;
        }
    }
    
    toogleSelect(index) {
        let select = this.select;
        let i = select.indexOf(index);
        let count = this.props.type == 'red' ? 6 : 1;
        if (i >= 0) {
            //移除
            select.splice(i, 1);
        } else if (select.length < count) {
            select.push(index);
        }
        this.forceUpdate();
        this.props.onSelect(this.select);
    }
    render() {
        var balls = [];
        var type = this.props.type;
        var count = type == 'red' ? 33 : 16;
        for (let i = 1; i <= count; i++) {
            let code = SSQController.formatCode(i);
            balls.push(<Ball
                type={type}
                key={type + i}
                isSelected={this.select.indexOf(code) >= 0}
                number={code}
                onPress={(index) => {
                    this.toogleSelect(index);
                } } />)
        }
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {balls}
            </View>);
    }
}
class RedBallSelector extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
        return <BaseBallSelector type='red' select = {this.props.select} onSelect={this.props.onSelect} />
    }
}
class BlueBallSelector extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
        return <BaseBallSelector type='blue' select = {this.props.select} onSelect={this.props.onSelect} />
    }
}
export default class BallSelector extends Component {
    constructor(...props) {
        super(...props);

    }
    render() {
        var type = this.props.type;

        return (
            <View style={{
                flexDirection: 'column'
            }}>
                <View style={{ height: 44, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: colorPair[type] }}>{titlePair[type]}</Text>
                </View>
                {type == 'red' && <RedBallSelector select = {this.props.select} onSelect={this.props.onSelect} /> || <BlueBallSelector select = {this.props.select} onSelect={this.props.onSelect} />}
            </View>)
    }

}