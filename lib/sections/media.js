var routes = require('../routes.js'),
    mediaRoutes = routes.media;

module.exports = function(txtics) {
  var fields = ['sentiment', 'categories', 'entities', 'concepts', 'timeExpressions', 'moneyExpressions', 'uris', 'phoneExpressions'],
      mod = {};

  mod.analyze = function (data, fields, callback) {
    var params = {
      fields: fields instanceof Array ? fields.join('|') : fields,
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
    
    txtics._post(mediaRoutes['analyze'], 'media' ,params, callback);
  }

  fields.forEach(function(f) {
    mod[f] = 
        (function(field) {
            return function (data, callback) {
              txtics.media.analyze(data, [field], callback);
            }
        })(f)
  });



  return mod;
}
