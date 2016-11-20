/**
 * @filename - app/react/view/Scene.js
 * @description - $(currentFile)
 */
'use strict'
import React, {Component,PropTypes} from 'react';
import {
   StyleSheet,
   View,
   Text,
} from 'react-native';
import Header from './Header';
import Body from './Body'
import NavigationBarRouteMapper from './NavigationBarRouteMapper';

export default class Scene extends Component{
   constructor(...props) {
       super(...props);
   }
   shouldComponentUpdate(nextProps, nextState) {
       return nextProps.isCurrent;
   }   
   render(){
       var Router = this.props.router;
       var route = this.props.route;
       var Content = route.component;
       var navigationBarRouteMapper = this.props.navigationBarRouteMapper;
       return (
           <View style = {{flex:1,flexDirection:'column'}}>
                <Header 
                    leftButton = {navigationBarRouteMapper.LeftButton(route,Router)}
                    title = {navigationBarRouteMapper.Title(route,Router)}
                    rightButton = {navigationBarRouteMapper.RightButton(route,Router)}
                    isHidden = {route.navigationBarHidden}
                    />
                <Body>
                    <Content {...route.passProps}/>
                </Body>
           </View>
       );
   }
}
Scene.defaultProps = {
    navigationBarRouteMapper:NavigationBarRouteMapper
}