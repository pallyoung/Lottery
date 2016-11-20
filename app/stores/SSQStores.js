'use strict'
import HttpController from './../controller/HttpController';
import R from './../res';
export default [
    {
        name:'ssqList',
        data:{
            list:[]
        },
        pump:function(){
            return HttpController.get(R.services.getSqqList).then(function(responseData){
                var data = responseData.data;
                return {
                    list:data
                }
            })
        },
        flow:['ssqLastOpenData']
    },
    {
        name:'ssqLastOpenData',
        data:{
            opencode:'',
            opentime:'',
            expect:''       
        },
        onFlow:function(flowin){
            if(flowin.name =='ssqList' ){
                let listOpenData = flowin.list[0];
                this.assign(listOpenData);
            }
        }
    },
    {
        name:'ssqMyRecord',
        data:{
            list:[]
        },
        storage:true
    }
]