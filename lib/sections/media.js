var routes = require('../routes.js'),
    mediaRoutes = routes.media;

module.exports = function(txtics) {
  return {

    sentiment: function(data, callback) {
      var params = {
        fields: 'sentiment',
        input : txtics.input || 'json',
        output: txtics.output || 'json',
        doc: {
          document: {

          }
        }
      };

      if(typeof data === 'string') {
        params.doc.document.txt = data;
        params.doc.document.id = new Date().getTime();
      }
      else {
        params.doc.document = data;
      }
      
      try {
        params.doc = JSON.stringify(params.doc)  
      }catch(e) {
        return callback({err: e});
      }
      

      txtics._post(mediaRoutes['analyze'], params, function(err, res, body) {
        if(err) return callback(err);
        return callback(null, body);
      });
    }
  }
}
