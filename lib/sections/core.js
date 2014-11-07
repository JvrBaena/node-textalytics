var routes = require('../routes.js'),
    coreRoutes = routes.core;

module.exports = function(txtics) {
  var mod = {};

  mod.sentiment = function (data, callback) {
    var params = {
      of: txtics.output || 'json'
    };

    if(typeof data === 'string') {
      params.txt = data;
    }
    else {
      params = data;
    }
        
    txtics._post(coreRoutes['sentiment'], 'core.sentiment', params, function(err, res, body) {
      if(err) return callback(err);
      return callback(null, body);
    });
  }

  return mod;
}
