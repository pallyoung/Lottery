'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default {

    LeftButton: function (route, router) {
        if(typeof route.leftButton == 'function'){
            return route.leftButton(route, router)
        }
        if (!route.canGoBack) {
            return null;
        }
        return (
            <TouchableOpacity
                onPress={() => router.goBack() }
                style={styles.navBarLeftButton}>
                <Image source={require('./back_arrow.png') } />
            </TouchableOpacity>
        );
    },
    RightButton: function (route, router) {
        if(typeof route.rightButton == 'function'){
            return route.rightButton(route, router)
        }
        return (
           null
        );
    },
    Title: function (route, router) {
        return (
            <View
                style = {styles.navBarTitleWrapper}>
                <Text style={[styles.navBarText, styles.navBarTitleText]}>
                    {route.title}
                </Text>
            </View>
        );
    },

};

const styles = StyleSheet.create({
    navBarLeftButton: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
        flex: 1
    },
    navBarTitleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    },
    navBarText: {
         color:'#000'
    },
    navBarTitleText: {
        fontSize: 15,
    },
})