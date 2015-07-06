var mcRoutes = require('../routes.js')['meaning_cloud'];

module.exports = function(meaningcloud) {
  var mod = {};

  mod.sentiment = function (data, callback) {
    var params = {
      of: meaningcloud.output || 'json',
      model: 'auto'
    };

    if(typeof data === 'string') {
      params.txt = data;
    }
    else {
      params = data;
    }        
    meaningcloud._post(mcRoutes['base'] + mcRoutes['sentiment'], 'core.sentiment', params, callback);
  }

  return mod;
}
