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

class ToolBarButton extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return (<TouchableOpacity
            style = {{
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                borderRightWidth:1/PixelRatio.get(),
                borderColor:'#dedede'
            }}
            onPress={() => {
                this.props.onPress()
            } }>
            <Text style = {{
                color:this.props.isActive?'#795da3':'#676767'
            }}>{this.props.text}</Text>
        </TouchableOpacity>);
    }
}
export default class ToolBar extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            selectedIndex:1
        }
    }
    choose(){
        
    }
    render() {
        return (
            <View style={{
                height: 44,
                flexDirection: 'row',
                borderTopWidth: 1 / PixelRatio.get(),
                borderColor: '#dedede'
            }}>

                <ToolBarButton 
                    onPress = {()=>{
                        if(this.state.selectedIndex!=1){
                            this.setState({
                                selectedIndex:1
                            });
                            this.props.tabChanged&&this.props.tabChanged(1)
                        }
                    }}
                    isActive = {this.state.selectedIndex==1}
                    text = '历史开奖'/>
                <ToolBarButton
                    onPress = {()=>{
                        if(this.state.selectedIndex!=2){
                            this.setState({
                                selectedIndex:2
                            });
                            this.props.tabChanged&&this.props.tabChanged(2)
                        }
                    }}
                    isActive = {this.state.selectedIndex==2} 
                    text = '我的彩票'/>
                <ToolBarButton
                    onPress = {()=>{
                        if(this.state.selectedIndex!=3){
                            this.setState({
                                selectedIndex:3
                            });
                            this.props.tabChanged&&this.props.tabChanged(3)
                        }
                    }} 
                    isActive = {this.state.selectedIndex==3}
                    text = '中奖查询'/>
                <ToolBarButton 
                    onPress = {()=>{
                        if(this.state.selectedIndex!=4){
                            this.setState({
                                selectedIndex:4
                            });
                            this.props.tabChanged&&this.props.tabChanged(4)
                        }
                    }}
                    isActive = {this.state.selectedIndex==4}
                    text = '购买彩票'/>
            </View>)
    }
}