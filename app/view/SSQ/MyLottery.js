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

import List from './List';
export default class MyLottery extends Component{
    constructor(...props) {
        super(...props);      
    }
    render(){
        return (
            <Binder bind = {SM.ssqMyRecord} 
                render = {()=><List type = 'buy' dataSource = {SM.ssqMyRecord.list}/>}/>
        );
    }
    
}
