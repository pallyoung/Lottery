/**
*EventEmitter.js
*@description
*简单的自定义事件
**/
"use strict"

import invariant from './invariant';
import EventSubscriptionVendor from './EventSubscriptionVendor';
import EmitterSubscription from './EmitterSubscription';

var id = 0;

class EventEmitter{
	constructor(){
		this._subscriber = new EventSubscriptionVendor();
	}
	//添加事件
	addListener(type,listener,context){
		return this._subscriber.addSubscription(
      type,
      new EmitterSubscription(this._subscriber, listener, context));
	}
	removeAllListeners(type){
		this._subscriber.removeAllSubscriptions(type);
	}
	removeCurrentListeners(){
		invariant(
      !!this._currentSubscription,
      'Not in an emitting cycle; there is no current subscription'
    );
    this._subscriber.removeSubscription(this._currentSubscription);
	}
	listeners(type){
		var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    return subscriptions ? subscriptions.filter(()=>true).map(
          function(subscription) {
            return subscription.listener;
          })
      : [];
	}
	once(type,listener,context){
		var emitter = this;
    return this.addListener(eventType, function() {
      emitter.removeCurrentListener();
      listener.apply(context, arguments);
    });
	}
	//触发事件
	emit(type,...args){
		var subscriptions = this._subscriber.getSubscriptionsForType(type);
    if (subscriptions) {
      var keys = Object.keys(subscriptions);
      for (var ii = 0; ii < keys.length; ii++) {
        var key = keys[ii];
        var subscription = subscriptions[key];

        // The subscription may have been removed during this event loop.
        if (subscription) {
          this._currentSubscription = subscription;
          subscription.listener.apply(
            subscription.context,
            args
          );
        }
      }
      this._currentSubscription = null;
    }
	}
	//移除事件
	removeListener(subscription){
		this._subscriber.removeSubscription(subscription);
	}
}

export default EventEmitter;
