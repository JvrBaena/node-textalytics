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
        
    txtics._post(coreRoutes['sentiment'], 'core.sentiment', params, callback);
  }

  return mod;
}
