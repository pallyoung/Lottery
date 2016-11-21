'use strict'
import React, {Component, PropTypes} from 'react';
import ReactNative,{View} from 'react-native';

import mlux from 'mlux';
import Window from './../react/view/Window';
import RouteMap from './../routes/RouteMap';
import Router from './../react/view/Router';
import StoreMap from './../stores';
import Storage from './../util/Storage';
var storgaeTool = {
    getter:function(name){
        return Storage.getItem(name);
    },
    setter:function(name,value){
        return Storage.setItem(name,value);
    }
}
// const routeMap = {
//     'test':{
//         component:Start,
//         title:'启动'
//     }
// }


// const StoreMap = [
//    { 
//     name:'ballList',
//     data:{test:1}
//     }
// ]
Router.setRouteMap(RouteMap);
global.Routes = Router.routes;
global.Router = Router;
global.SM = mlux.StoreManager;
SM.setStorageTool(storgaeTool);
class Index extends Component {
    constructor(...props){
        super(...props);
        this.state = {
            loaded:false
        }
        SM.mapRegister(StoreMap).then(()=>{
            this.setState({loaded:true})
        });
    }
    componentDidMount() {
        
    }  
    render() {
        if(!this.state.loaded){
            return <View />
        }
        return (
            <Window 
                ref = {v=>global.Window = v}
                initialRoute = {Routes.SSQ_INDEX}/>
        );
    }
}

Index.propTypes = {

};

export default Index;