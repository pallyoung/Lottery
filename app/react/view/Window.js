'use strict'
/**
 * @filename - app/react/view/Window.js
 * @description - $(currentFile)
 */
'use strict'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    AppState,
    View,
    Text,
} from 'react-native';
import { EventEmitter } from 'fbemitter';
import Router from './Router';
var styles;
function createStyleSheet() {
    styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'column'
        }
    });
}


export default class Window extends Component {
    constructor(...props) {
        super(...props);
        this.appState = AppState.currentState;
        this.emitter = new EventEmitter();
        this.routers = [this.props.initialRoute];
        if (!styles) {
            createStyleSheet();
        }
        this.plugins = this.props.plugin||{};
    }

    componentWillMount() {

        AppState.addEventListener('change', (appState) => {
            this.appState = appState;
            switch (appState) {
                case 'active':
                    this.emit('resume');
                    break;
                default:
                    this.emit('pause');
            }
        });

        AppState.addEventListener('memoryWarning', () => {
            this.emit('memoryWarning');
        });
    }
    emit(type, ...args) {
        this.emitter.emit(type, ...args);
    }
    addEventListener(type, listener) {
        return this.emitter.addListener(type, listener);
    }
    insertPlugin(name,plugin){
        this.plugins[name] = plugin;
        this.forceUpdate();
    }
    removePlugin(name){
        delete this.plugins[name];
        delete this[name];
        this.forceUpdate();
    }
    _renderPlugins(){
        return Object.keys(this.plugins).map((v)=>{
            var Plugin = this.plugins[v];
            return <Plugin  ref = {plugin=>this[v] = plugin} />
        });
    }

    render() {
        return (
            <View
                onStartShouldSetPanResponder={() => {
                    dismissKeyboard();
                    return false;
                } }
                style={styles.wrapper}>
                <Router 
                    navigationBarRouteMapper = {this.props.navigationBarRouteMapper}
                    initialRoute = {this.props.initialRoute}/>
                {this._renderPlugins()}
            </View>
        );
    }
}
