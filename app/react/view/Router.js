'use strict'
/**
 * @filename - app/react/view/Router.js
 * @description - $(currentFile)
 */
'use strict'
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Navigator
} from 'react-native';
import Scene from './Scene';
var id = 1;
const PREFIX = 'router_';

var routeMap = {};

var filterMap = {};

const routes = {

}
var routers = [];
var topRouter;

function fromatName(name) {
    return name.replace(/[A-Z]/g, function (v) {
        return '_' + v;
    }).toUpperCase();
}

function routeFilter(url, route) {
    var resolve;
    var promise = new Promise(function (res, rej) {
        resolve = res;
    });
    if (filterMap[url]) {
        filterMap[url](resolve, url, route, routeMap)
    } else {
        resolve(route);
    }
    return promise;
}

function setRouteMap(map) {
    for (let routeName in map) {
        map[routeName].name = routeName;
        routes[fromatName(routeName)] = routeName;
    }
    routeMap = Object.assign(routeMap, map);
}

function setFilterMap(map) {
    filterMap = Object.assign(filterMap, map);
}

function getRouteMap() {
    return routeMap;
}

function getFilterMap() {
    return filterMap;
}

function routeFilter(route) {
    var resolve;
    var promise = new Promise(function (res, rej) {
        resolve = res;
    });
    let routeName = route.name;
    for (var o in filterMap) {
        let reg = new RegExp(o);
        if (reg.test(routeName)) {
            let filter = filterMap[o];
            filter(resolve, route, Router);
            return promise;
        }
    }
    resolve(route);
    return promise;
}
async function initRoute(routeName, config) {
    var route = routeMap[routeName];
    if (!route) {
        throw new Error('no route found');
    }
    route = Object.assign({}, route, config);

    route = await routeFilter(route);
    return route;
}

function noop() {

}

export default class Router extends Component {
    constructor(...props) {
        super(...props);
        id++;
        this._id = PREFIX + id;

        var initialRoute = this.props.initialRoute;
        if (typeof initialRoute === 'string') {
            initialRoute = routeMap[this.props.initialRoute];
        }
        routers.push({
            router: this,
            initialRoute: initialRoute
        });
        topRouter = this;
    }
    componentDidMount() {
       
    }
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    static setRouteMap(map) {
        setRouteMap(map);
    }
    static setFilterMap(map) {
        setFilterMap(map);
    }
    static getRouteMap() {
        return getRouteMap();
    }
    static getFilterMap() {
        return getFilterMap();
    }
    static goBack() {
        if (topRouter.canGoBack) {
            topRouter.goBack();
        } else if (routers.length > 1) {
            Router.close();
        }
    }
    static async push(routeName, config) {
        var route = await initRoute(routeName, config);
        if (route.canGoBack === undefined) {
            route.canGoBack = topRouter.currentRoutesLength >=1;
        }
        topRouter.push(route);
    }
    static async resetTo(routeName, config) {
        var route = await initRoute(routeName, config);
        topRouter.resetTo(route);
    }
    static async redirect(routeName, config = {}) {
        config.method = 'redirect';
        var route = await initRoute(routeName, config);
        topRouter.push(route);
    }
    static close() {
        if (routers.length > 1) {
            let router = routers.pop();
            topRouter = routers[routers.length - 1].router;
            topRouter.popToRoute(router.initialRoute);
        }
    }
    get canGoBack() {
        return this.currentRoute.canGoBack;
    }
    get currentRoutesLength() {
        if (this.navigator) {
            return this.navigator.getCurrentRoutes().length;
        }
        return -1;
    }
    get currentRoute() {
        try {
            var routes = this.navigator.getCurrentRoutes();
            return routes[routes.length - 1];
        } catch (e) {
            return null;
        }
    }
    goBack() {
        if (typeof this.currentRoute.goBack == 'function') {
            this.currentRoute.goBack(this);
        } else {
            this.navigator.pop();
        }
    }
    push(route) {
        this.navigator.push(route);
    }
    popToRoute(route) {
        var currentRoutes = this.navigator.getCurrentRoutes();
        var i = currentRoutes.length - 1;
        for (; i >= 0; i--) {
            if (route === currentRoutes[i]) {
                
                break;
            }
        }
        this.navigator.popN(currentRoutes.length-i);
    }
    resetTo(route) {
        this.navigator.resetTo(route);
    }
    _renderScene(route, navigator) {
        if (route.method == 'redirect') {
            route.method = 'push'
            return <Router initialRoute={route} navigationBarRouteMapper={this.props.navigationBarRouteMapper} />
        }
        let routes = navigator.getCurrentRoutes();
        let currentRoute = routes[routes.length - 1];
        let isCurrent = topRouter == this && route == currentRoute;
        return <Scene
            navigationBarRouteMapper={this.props.navigationBarRouteMapper}
            router={Router}
            route={route}
            isCurrent={isCurrent} />
    }
    render() {
        var initialRoute = this.props.initialRoute;
        if (typeof initialRoute === 'string') {
            initialRoute = routeMap[this.props.initialRoute];
        }
        return (
            <Navigator
                configureScene={(route, routeStack) => {
                    return route.sceneConfigs || Navigator.SceneConfigs.PushFromRight;
                } }
                ref={(navigator) => this.navigator = navigator}
                initialRoute={initialRoute}
                sceneStyle={{ flex: 1, flexDirection: 'column' }}
                renderScene={this._renderScene.bind(this)} />
        );
    }
}


Router.routes = routes;