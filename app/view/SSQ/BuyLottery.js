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
import SSQController from './../../controller/SSQController';
import Ball from './Ball';
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
        this.red = [];
        this.blue = [];
    }
    render() {
        var nextExpect = SSQController.getNextExpect()
        return <View style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{
                height: 44,
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
                <BallSelector 
                    select = {this.red}
                    type='red'
                    onSelect={(select) => {
                        this.red = select.sort();
                        this.forceUpdate();
                    } } />
                <View style={{
                    height: 2,
                    backgroundColor: '#efefef',
                    marginVertical: 16
                }} />
                <BallSelector 
                    select = {this.blue}
                    type='blue'
                    onSelect={(select) => {
                        this.blue = select;
                        this.forceUpdate();
                    } } />

                <View
                    style={{
                        marginVertical: 5
                    }} >
                    <Text>投注信息</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginVertical: 5
                }} >
                    {this.red.map((number, i) => {
                        return <Ball isSelected={true} type='red' number={number} key={'red' + i} />
                    })}
                    {this.blue.map((number, i) => {
                        return <Ball isSelected={true} type='blue' number={number} key={'blue' + i} />
                    })}
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 44
                }} >
                    <Button
                        text = '立即投注'
                        onPress = {
                            () => {
                                if(this.red.length+this.blue.length!=7){
                                    return;
                                }
                                var now = new Date();
                                var lottery = SSQController.createLottery(
                                    nextExpect,
                                    this.red.join(',')+'+'+this.blue[0],
                                    now
                                    );
                                var myRecordList = SM.ssqMyRecord.list;
                                myRecordList.push(lottery);
                                SM.ssqMyRecord.list = myRecordList;
                                this.red = [];
                                this.blue = [];
                                this.forceUpdate();
                            }
                        }/>
                    <Button
                        text = '机选一注'
                        onPress = {
                            () => {
                                var opencode = SSQController.getOpencodeByRand();
                                this.red = opencode.slice(0, 6);
                                this.blue = opencode.slice(-1);
                                this.forceUpdate();
                            }
                        }/>
                </View>
            </ScrollView>

        </View>
    }

}