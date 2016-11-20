'use strict'
import EventEmitter from './EventEmitter';
function noop(prama) {
    return prama;
};
export default class Http extends EventEmitter {
    constructor() {
        super();
        this.timeout = Http.timeout;
        this.connectCount = 0;
        this.successFilter = noop;
        this.errorFilter = noop;
        this.timeoutFilter = noop;
        this.connectBound = 10;
        this.cache = [];
    }
    http(request) {
        this.emit('beforeRequest', request);
        Http.connectCount++;
        this.connectCount++;
        var _resolve, _reject, _timeout;
        var promise = new Promise(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        });
        var resolveCallback = (response) => {
            this.connectCount--;
            Http.connectCount--;
            //取消超时
            clearTimeout(_timeout);
            if(this.cache.length>0){
                this.cache.shift()();
            }
            if (response.ok) {
                return response.text().then((content) => {
                    console.log('<======response', response);
                    this.emit('success', response);
                    this.emit('afterRequest', request);
                    try {
                        content = JSON.parse(content);
                    } catch (e) {
                        console.log('http', e);
                    }
                    _resolve(content);
                });
            } else {
                this.emit('error', response);
                this.emit('afterRequest', request);
                _reject(response);
            }
        }
        var rejectCallback = (response) => {
            if(this.cache.length>0){
                this.cache.shift()();
            }
            this.emit('error', response);
            this.emit('afterRequest', request);
            _reject(response);
        }
        //超时
        _timeout = setTimeout(() => {
            this.connectCount--;
            Http.connectCount--;
            this.emit('timeout', null);
            this.emit('afterRequest', request);
            if(this.cache.length>0){
                this.cache.shift()();
            }
            resolveCallback = noop;
            rejectCallback = noop;
            _reject({ message: 'timeout' });
        }, this.timeout);

        if (this.connectCount <= this.connectBound) {
            console.log('======>request', request);
            fetch(request).then((response) => {
                resolveCallback(response);
            }, (response) => {
                console.log(response,12121)
                rejectCallback(response);
            }).catch(error => {
                console.log(error);
            });
        }else{
            this.cache.push(function(){
                console.log('======>request', request);
                fetch(request).then((response) => {                  
                        resolveCallback(response);
                    }, (response)=>{
                        rejectCallback(response);
                    }).catch(error => {
                        console.log(error);
                });
            });
        }

        return promise;

    }
    post(url, prama = {}, headers = {}) {
        var body;
        var headers = new Headers(headers);
        for (let key in prama) {
            body = body || new FormData();
            if (prama.hasOwnProperty(key)) {
                let v = prama[key];
                if (typeof prama[key] == 'object' && !prama[key].uri) {
                    v = JSON.stringify(prama[key]);
                }
                body.append(key, v);
            }
        }
        let request = new Request(url, { method: 'post', body, credentials: 'include', mode: "FormData", headers });
        return this.http(request);
    }
    get(url, prama = {}, headers = {}) {
        var keys = [];
        var headers = new Headers(headers);
        for (var key in prama) {
            if (prama.hasOwnProperty(key)) {
                keys.push(key + '=' + prama[key]);
            }
        }
        if (keys.length) {
            url = url + '?' + keys.join('&');
        }
        var request = new Request(url, { method: 'get', credentials: 'include', headers });
        return this.http(request);
    }
}
Http.timeout = 90000;//超时
Http.connectCount = 0;