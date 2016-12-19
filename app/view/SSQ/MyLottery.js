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
import Binder from 'react-mlux-binder'

import List from './List';
export default class MyLottery extends Component{
    constructor(...props) {
        super(...props);      
    }
    render(){
        return (
            <Binder bind = {SM.ssqMyRecord} 
                render = {()=><List showsVerticalScrollIndicator = {false} type = 'buy' dataSource = {SM.ssqMyRecord.list}/>}/>
        );
    }
    
}
