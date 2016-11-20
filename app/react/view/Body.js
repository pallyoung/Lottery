/**
 * @filename - app/react/view/Body.js
 * @description - $(currentFile)
 */
'use strict'
import React, {Component,PropTypes} from 'react';
import {
   StyleSheet,
   View,
   Text,
} from 'react-native';
export default class Body extends Component{
   constructor(...props) {
       super(...props);
   }
   render(){
       return (
           <View style = {{flex:1,flexDirection:'column'}}>
            {this.props.children}
           </View>
       );
   }
}