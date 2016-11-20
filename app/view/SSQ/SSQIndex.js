/**
 * @filename - app/view/SSQ/SSQIndex.js
 * @description - $(currentFile)
 */
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

import History from './History';
import MyLottery from './MyLottery';
import BuyLottery from './BuyLottery';
import ToolBar from './ToolBar';

export default class SSQIndex extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            selectedIndex:1
        }

    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {this.state.selectedIndex==1&&<History />}
                    {this.state.selectedIndex==2&&<MyLottery />}
                    {this.state.selectedIndex==4&&<BuyLottery />}
                </View>
                <ToolBar 
                    tabChanged = {(index)=>this.setState({selectedIndex:index})}/>
            </View>);
    }
}