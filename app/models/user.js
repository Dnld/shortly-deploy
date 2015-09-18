var db = require('../config');

var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  Id: Schema.Types.ObjectId,
  username: String,
  password: String,
  timestamp: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

User.createUser = function(user, res) {
  bycrypt.hash(user.password, function(err, hash) {
    if (err) {
      console.log('password not encrypted');
      return;
    }
    user.password = hash;
    var newUser = new User(user);
    
    newUser.save(function(err, newUser) {
      if (err) {
        console.log('user not added');
        return;
      }
      res.send(200, newUser);
    });
    
  });
};

module.exports = User;


// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

