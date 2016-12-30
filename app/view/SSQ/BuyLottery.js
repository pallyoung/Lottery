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
import { createStore, type } from 'mlux';
import Binder from 'react-mlux-binder';
import BallSelector from './BallSelector';
import SSQController from './../../controller/SSQController';
import Ball from './Ball';
import {autoSize} from 'react-native-improver';
class BallSelect extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 5
        }} >
            {this.props.red.map((number, i) => {
                return <Ball isSelected={true} type='red' number={number} key={'red' + i} />
            })}
            {this.props.blue.map((number, i) => {
                return <Ball isSelected={true} type='blue' number={number} key={'blue' + i} />
            })}
        </View>
    }
}
class Button extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <TouchableOpacity
            onPress={
                this.props.onPress
            }
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Text style={{
                color: '#de5749'
            }}>{this.props.text}</Text>
        </TouchableOpacity>
    }
}
export default class BuyLottery extends Component {
    constructor(...props) {
        super(...props);
        this.red = createStore({
            name: 'red',
            data: {
                value: []
            }
        });
        this.blue = createStore({
            name: 'blue',
            data: {
                value: []
            }
        });
    }
    render() {
        var nextExpect = SSQController.getNextExpect();
        var BinderBallSelector = Binder.createClass(BallSelector);
        var BinderBallSelect = Binder.createClass(BallSelect);
        return <View style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{
                height: autoSize(44),
                backgroundColor: '#f75549',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: 'white'
                }}>第{nextExpect}期</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, flexDirection: 'column', marginHorizontal: 16 }} >
                <BinderBallSelector
                    bind={this.red}
                    getProps={() => {
                        return {
                            select: this.red.value,
                            type: 'red',
                            onSelect: (select) => {
                                this.red.value = select.sort().slice();
                            }
                        }
                    } }
                    />
                <View style={{
                    height: 2,
                    backgroundColor: '#efefef',
                    marginVertical: 16
                }} />
                <BinderBallSelector
                    bind={this.blue}
                    getProps={() => {
                        return {
                            select: this.blue.value,
                            type: 'blue',
                            onSelect: (select) => {
                                this.blue.value = select.sort().slice();
                            }
                        }
                    } } />
                <View
                    style={{
                        marginVertical: 5
                    }} >
                    <Text>投注信息</Text>
                </View>
                <BinderBallSelect
                    bind={[this.blue,this.red]}
                    getProps={() => {
                        return {
                            red: this.red.value,
                            blue: this.blue.value
                        }
                    } } 
                     />
                <View style={{
                    flexDirection: 'row',
                    height: 44
                }} >
                    <Button
                        text='立即投注'
                        onPress={
                            () => {
                                if (this.red.value.length + this.blue.value.length != 7) {
                                    return;
                                }
                                var now = new Date();
                                var lottery = SSQController.createLottery(
                                    nextExpect,
                                    this.red.value.join(',') + '+' + this.blue.value[0],
                                    now
                                );
                                var myRecordList = SM.ssqMyRecord.list;
                                myRecordList.push(lottery);
                                SM.ssqMyRecord.list = myRecordList;
                                this.red.value = [];
                                this.blue.value = [];
                            }
                        } />
                    <Button
                        text='机选一注'
                        onPress={
                            () => {
                                var opencode = SSQController.getOpencodeByRand();
                                this.red.value = opencode.slice(0, 6);
                                this.blue.value = opencode.slice(-1);
                            }
                        } />
                </View>
            </ScrollView>

        </View>
    }

}