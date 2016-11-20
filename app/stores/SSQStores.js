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
        }
    }
]