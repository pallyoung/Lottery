'use strict'

import Http from './../util/Http';

var http = new Http();
function post(url,params,headers){
   return  http.post(url,params,headers);
}
function get(url,params,headers){
    return http.get(url,params,headers);
}
export default {
    post,
    get
}