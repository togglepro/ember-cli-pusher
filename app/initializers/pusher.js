import Ember from 'ember';
import ENV from '../config/environment';
import { Controller } from 'ember-pusher/controller';

export function initialize(container, app) {
  container.register('pusher:main', Controller);
  var options = ENV['APP']['PUSHER_OPTS'];

  Ember.assert('Define PUSHER_OPTS in your config', typeof options !== 'undefined');
  Ember.assert('Pusher library is required', typeof window.Pusher !== 'undefined');

  var pusher = new window.Pusher(options.key, options.connection);
  var pusherController = container.lookup('pusher:main');
  pusherController.didCreatePusher(pusher);

  app.inject('controller', 'pusher', 'pusher:main');
  app.inject('route', 'pusher', 'pusher:main');
}

export default {
  name: 'pusher',
  initialize: initialize
};
