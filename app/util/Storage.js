/**
 *@description 本地存储
 **/

"use strict"

import ReactNative, {AsyncStorage}  from 'react-native';


//AsyncStorage.getAllKeys();

var Storage = {
    getAllKeys: AsyncStorage.getAllKeys,
    setItem(key, value) {
        if (value == null) {
            return Promise.reject('value is null');
        }
        try {
            value = JSON.stringify(value);
        } catch (e) {
            console.log(e);
        }
        return AsyncStorage.setItem(key, value);
    },

    getItem(key) {
        var result = AsyncStorage.getItem(key).then(
            function (value) {
                if (value == "0") {
                    return undefined;
                }
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }

            }, function () { return false });
        return result;
    },

    clear() {
        return AsyncStorage.clear();
    },

    removeItem(key) {
        return AsyncStorage.removeItem(key);
    },

    //
    multiGet(keys) {
        return AsyncStorage.multiGet(keys)
            .then(results => {
                return results.map(item => {
                    return [item[0], JSON.parse(item[1])]
                });
            }, function (result) {
                return result;
            });
    },
    //删除
    multiRemove(keys) {
        return AsyncStorage.multiRemove(keys);
    }
}


export default Storage;
