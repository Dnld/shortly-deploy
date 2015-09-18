var db = require('../config');
var crypto = require('crypto');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  Id: Schema.Types.ObjectId,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: String,
  timestamp: { type: Date, default: Date.now }    
});

var Link = mongoose.model('Link', linkSchema);

Link.createLink = function(link, res) {
  var newLink = new Link(link);
  
  newLink.save(function(err, newLink) {
    if (err) {
      console.log('link not added');
      return;
    }
    res.send(200, newLink);
  });
};

module.exports = Link;

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

