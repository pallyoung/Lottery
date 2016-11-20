/**
 * @filename - app/view/Start.js
 * @description - $(currentFile)
 */
'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import mlux from 'mlux';
var Binder = mlux.Binder;
var redirect = 1
var push = 1
export default class Start extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            test:1
        }
    }
    render() {
        return (
            <Binder bind = 'ballList' context = {this}>
                <View style={{ flex: 1, backgroundColor: '#eeddff' }}>
                    <Text>{SM.ballList.test}</Text>
                    <Text>{this.state.test}</Text>
                    <Text>{this.props.text}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            SM.ballList.test = Date.now()
                            this.state.test = Date.now()
                        } }>
                        <Text>test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({test:Date.now()});
                        } }>
                        <Text>state</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Router.goBack()
                        } }>
                        <Text>上一页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            SM.ballList.test = Date.now()
                            Router.push(Router.routes.TEST, { passProps: { text: 'push' + push++ } })
                        } }>
                        <Text>下一页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Router.close()
                        } }>
                        <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Router.redirect(Router.routes.TEST, { passProps: { text: 'redirect' + redirect++ }, canGoBack: false })
                        } }>
                        <Text>redirect</Text>
                    </TouchableOpacity>
                </View>
            </Binder>
        );
    }
}