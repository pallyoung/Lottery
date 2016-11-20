/**
 * @filename - app/react/view/Stage.js
 * @description - $(currentFile)
 */
'use strict'
import React, {Component,PropTypes} from 'react';
import {
   StyleSheet,
   View,
   Text,
} from 'react-native';
import Router from './Router'
export default class Stage extends Component{
   constructor(...props) {
       super(...props);
   }
   render(){
       return (
           <Router
            initialRoute = {this.props.initialRoute}/>
       );
   }
}