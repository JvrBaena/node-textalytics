var routes = require('../routes.js'),
    mediaRoutes = routes.media,
    crypto = require('crypto');

module.exports = function(txtics) {
  return {

    sentiment: function(data, callback) {
      var params = {
        fields: 'sentiment',
        input : txtics.input || 'json',
        output: txtics.output || 'json',
        doc: {

        }
      };

      if(typeof data === 'string') {
        params.doc.txt = data;
        params.doc.id = crypto.randomBytes(64).toString('base64');
      }
      else {
        params.doc = data;
      }

      txtics._post(mediaRoutes['analyze'], params, function(err, res, body) {
        if(err) return callback(err);
        return callback(null, body);
      });
    }
  }
}
