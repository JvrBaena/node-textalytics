var VERSION = '2.0.0',
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
  this.meaning_cloud = require('./sections/meaning_cloud.js')(this);

};


Textalytics.prototype._post = function(url, api, params, callback) {
  var self = this;
  params.key = self.keys[api];
  request.post({uri: url, form: params}, function(err, res, body) {
    if (err) return callback(err);
    var obj;
    try {
      obj = JSON.parse(body);
    } catch(e) {
      return callback({err: e});
    }

    // This handles successful calls that return
    // api error codes (distinct from '0')


    if (obj.status.code !== '0') {
      err = {
        msg: obj.status.msg,
        code: obj.status.code
      }
    }

    return callback(err, obj);
  });
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
