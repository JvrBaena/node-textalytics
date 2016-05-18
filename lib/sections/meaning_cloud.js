var mcRoutes = require('../routes.js')['meaning_cloud'];

module.exports = function(meaningcloud) {
  var mod = {};

  mod.sentimentV20 = function (data, cb) {
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
    meaningcloud._post(mcRoutes['base'] + mcRoutes['sentimentV20'], 'core.sentiment', params, cb);
  };

  mod.sentimentV21 = function (data, callback) {
    var params = {
      of: meaningcloud.output || 'json',
      model: 'general',
      lang: 'auto'
    };

    if(typeof data === 'string') {
      params.txt = data;
    }
    else {
      params = data;
    }        
    meaningcloud._post(mcRoutes['base'] + mcRoutes['sentimentV21'], 'core.sentiment', params, callback);
  };

  mod.sentiment = mod.sentimentV20;


  mod.user_profiling = function(data, cb) {
    meaningcloud._post(mcRoutes['base'] + mcRoutes['user_profiling'], 'core.sentiment', data, cb);
  };

  mod.text_classification = function(data, cb) {
    meaningcloud._post(mcRoutes['base'] + mcRoutes['text_classification'], 'core.sentiment', data, cb);
  };

  return mod;
}
