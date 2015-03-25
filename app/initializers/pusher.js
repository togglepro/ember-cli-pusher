import Ember from 'ember';
import ENV from '../config/environment';
import { Controller } from 'ember-pusher/controller';

export function initialize(container, app) {
  container.register('pusher:main', Controller);
  var promise = ENV['APP']['PUSHER_OPTS'];
  
   Ember.assert('Pusher library is required', typeof window.Pusher !== 'undefined');
  
  if (!(promise instanceof Ember.RSVP.Promise)) {
    promise = new Ember.RSVP.Promise(function(resolve) {
      Ember.assert('Define PUSHER_OPTS in your config', typeof promise !== 'undefined');
      resolve(promise);
    })
  }
  
  promise.then(function(options) {
    var pusher = new window.Pusher(options.key, options.connection);
    var pusherController = container.lookup('pusher:main');
    pusherController.didCreatePusher(pusher);

    app.inject('controller', 'pusher', 'pusher:main');
    app.inject('route', 'pusher', 'pusher:main');
  });
}

export default {
  name: 'pusher',
  initialize: initialize
};
