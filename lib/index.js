var VERSION = '0.0.0',
    request = require('request'),
    routes = require('./routes.js');

function Textalytics(params) {
  if(!(this instanceof Textalytics)) return new Textalytics(params);
  if(!params.apiKey) throw new Error('ApiKey must be provided');

  this.apiKey = params.apiKey;
  this.input = params.input;
  this.output = params.output;

  this.media = require('./sections/media.js')(this);

};


Textalytics.prototype._post = function(url, params, callback) {
  var self = this;
  params.key = self.apiKey;
  request.post(routes['base'] + url, params, callback);
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
