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
import Item from './Item';
var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
});
export default class List extends Component {
    constructor(...props) {
        super(...props);
    }
    componentDidMount() {
        if (SM.ssqList.list.length == 0) {
            SM.ssqList.pump();
        }
    }
    _renderRow(item, id, sid) {
        return <Item key={id} type = {this.props.type} dataSource={item} />
    }
    render() {
       return  (<ListView
            enableEmptySections = {true}
            style={{
                marginHorizontal: 16,
                flex: 1
            }}
            renderRow={(item, id, sid) => {
                return this._renderRow(item, id, sid)
            } }
            dataSource={
                ds.cloneWithRows(this.props.dataSource)
            } />);
    }
}