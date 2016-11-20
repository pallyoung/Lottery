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
} from 'react-native';
import mlux from 'mlux';
var Binder  = mlux.Binder;
var id = 1;
// function ssqItemStoreCreator(){
//     id++;
//     return {
//         name:'sqqItem'+id,
//         data:{
//             "expect":"2016134",
//             "opencode":"11,12,13,14,18,33+13",
//             "opentime":"2016-11-15 21:20:40",
//             "opentimestamp":1479216040
//         }
//     }
// }

class Ball extends Component{
    constructor(...props) {
        super(...props);
    }
    render(){
        return <View style = {{
            height:30,
            width:30,
            backgroundColor:this.props.type,
            borderRadius:100,
            marginRight:10,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        }}><Text style = {{
            color:'white'
        }}>{this.props.number}</Text></View>
    }
}
class BallList extends Component{
    constructor(...props) {
        super(...props);
    }
    render(){
        var balls = this.props.balls;
        var buleBall = balls.slice(balls.indexOf('+')+1);
        var redBalls = balls.slice(0,balls.indexOf('+')).split(',');
        var views = [];
        redBalls.forEach((ball,i)=>{
            views.push(<Ball type = 'red' key = {'ball'+i} number = {ball}/>);
        });
        views.push(<Ball type = 'blue' key = {'ball7'} number = {buleBall}/>);
        return (
            <View style = {{flex:1,flexDirection:'row',alignItems:'center'}}>
                {views}
            </View>);
    }
}
class Item extends Component {
    constructor(...props) {
        super(...props);
        //let store = ssqItemStoreCreator();
        //this.storeName = store.name;
        //store.assign(this.props.dataSource);
    }
    _formatOpenTime(opentime){
        return opentime.slice(0,opentime.indexOf(' '));
    }
    render() {
        let dataSource = this.props.dataSource;
        return (
            <View style = {{
                height:60
            }}>
                <View style = {{
                    height:20,
                    flexDirection:'row',
                    justifyContent:'flex-start',
                    alignItems:'center'
                }}>
                    <Text style = {{
                        color:'#ac9b6d'
                    }}>第{dataSource.expect}期  {this._formatOpenTime(dataSource.opentime)}</Text>
                </View>  
                <View style = {{flex:1}}>
                    <BallList balls = {dataSource.opencode} />
                </View>   
             </View>)
    }
}
var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
});
export default class SSQIndex extends Component {
    constructor(...props) {
        super(...props);
    }
    componentDidMount() {
        if (SM.ssqList.list.length == 0) {
            SM.ssqList.pump();
        }
    }
    _renderRow(item, id, sid) {
        return <Item key={id} dataSource={item} />
    }
    render() {
       return( <Binder bind = 'ssqList' context = {this}>
            {SM.ssqList.list.length != 0 &&<ListView
                    style = {{
                        marginHorizontal:16
                    }}
                    renderRow={(item, id, sid) => {
                        return this._renderRow(item, id, sid)
                    } }
                    dataSource={
                        ds.cloneWithRows(SM.ssqList.list)
                    } /> || <View />}
        </Binder>);

    }
}