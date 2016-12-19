'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TextInput,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import mlux from 'mlux';
import Binder from 'react-mlux-binder'
import List from './List';
export default class History extends Component {
    constructor(...props) {
        super(...props);
    }
    componentDidMount() {
        if (SM.ssqList.list.length == 0) {
            SM.ssqList.pump();
        }
    }
    _renderRow(item, id, sid) {
        return <Item key={id} dataSource={item} />
    }
    render() {
        return <List
                    dataSource={
                        SM.ssqList.list
                    } />
    }
}