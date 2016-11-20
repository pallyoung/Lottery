'use strict'
/**
 * @filename - app/react/view/Header.js
 * @description - $(currentFile)
 */
'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform
} from 'react-native';
var styles;
const IS_IOS = (Platform.OS=='ios');
function createStyleSheet() {
    styles = StyleSheet.create({
        buttonWrapper: {
            paddingLeft:20,
            width: 84,
            flexDirection:'row'
        },
        rightButtonWrapper:{
            paddingLeft:0,
            paddingRight:20
        }
    });
}
export default class Header extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            title: this.props.title,
            leftButton: this.props.leftButton,
            rightButton: this.props.rightButton,
            isHidden: this.props.isHidden
        }
        if (!styles) {
            createStyleSheet();
        }
    }

    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentWillReceiveProps(nextProps) {
        var props = this.props;
        if(props.title!=nextProps.title){
            this.state.title = nextProps.title;
        }
        if(props.leftButton!=nextProps.leftButton){
            this.state.leftButton = nextProps.leftButton;
        }
        if(props.isHidden!=nextProps.isHidden){
            this.state.isHidden = nextProps.isHidden;
        }
        if(props.rightButton!=nextProps.rightButton){
            this.state.rightButton = nextProps.rightButton;
        }
    }
    set isHidden(value) {
        this.isMount() && this.setState({ title: value });
    }
    get isHidden() {
        return this.state.isHidden
    }
    set title(value) {
        this.isMount() && this.setState({ title: value });
    }
    set leftButton(value) {
        this.isMount() && this.setState({ leftButton: title });
    }
    set rightButton(value) {
        this.isMount() && this.setState({ rightButton: title });
    }
    render() {
        if (this.state.isHidden) {
            return null;
        };
        return (
            <View style={{ height: IS_IOS?64:44, flexDirection: 'row',paddingTop:IS_IOS?20:0 }}>
                <View style={styles.buttonWrapper}>
                    {this.state.leftButton}
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    {this.state.title}
                </View>
                <View style={[styles.buttonWrapper,styles.rightButtonWrapper]}>
                    {this.state.rightButton}
                </View>
            </View>
        );
    }
}
Header.propTypes = {
    leftButton: PropTypes.node,
    rightButton: PropTypes.node,
    title: PropTypes.node
}
Header.defaultProps = {
    leftButton:null,
    rightButton:null,
}