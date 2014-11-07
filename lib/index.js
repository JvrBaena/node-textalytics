var VERSION = '0.0.0',
    request = require('request'),
    routes = require('./routes.js');

function Textalytics(params) {
  if(!(this instanceof Textalytics)) return new Textalytics(params);
  if(!params.keys || Object.keys(params.keys).length === 0) throw new Error('At least one api key must be provided in the keys params');

  this.keys = params.keys;
  this.input = params.input;
  this.output = params.output;

  this.media = require('./sections/media.js')(this);
  this.core = require('./sections/core.js')(this);

};


Textalytics.prototype._post = function(url, api, params, callback) {
  var self = this;
  params.key = self.keys[api];
  request.post({uri:routes['base'] + url, form: params}, callback);
}

// Textalytics.prototype._get = function(url, callback) {
//   var self = this;
//   request.get(routes['base'] + self.user + '/' + self.apiKey + url, callback);
// }

// Textalytics.prototype._put = function(url, params, callback) {
//   var self = this;
//   request.put(routes['base'] + self.user + '/' + self.apiKey + url, params, callback);
// }

// Textalytics.prototype._delete = function(url, params, callback) {
//   var self = this;
//   request.del(routes['base'] + self.user + '/' + self.apiKey + url, params, callback);
// }

module.exports = Textalytics;
