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
  // var shasum = crypto.createHash('sha1')
  // shasum.update(model.url);
  // link.code = shasum.digest('hex').slice(0, 5);
  
  // to do -- fix crypto
  var temp = Math.floor(Math.random() * 10000);
  link.code = temp;
  //console.log(link.code);
  var newLink = new Link(link);
  
  newLink.save(function(err, newLink) {
    if (err) {
      console.log('link not added');
      return;
    }
    res.send(200, newLink);
  });
};

Link.fetchUrl = function(req, res, callback) {
  var result = Link.find({code: req}).select('url');
  //var result = Link.find.select('code');
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', result.code);
  
  // Link.findOne({code: req}, 'url', function(err, result, res) {
  //   if (!result) {
  //     res.redirect('/');
  //   } else {
  //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!link found')
  //     //console.log(result);
  //     callback(result);
  //     // link.update({$inc: {visits: 1}}, function(err, result, res) {
  //     //   callback(link.url);
  //     // });
  //   }
  // });
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

