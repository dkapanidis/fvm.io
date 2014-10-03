'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Fig = mongoose.model('Fig'),
  Repo = mongoose.model('Repo'),
  User = mongoose.model('User');

/**
 * List of figs by user
 */
exports.showUserFigs = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Fig.find({user: userId}).sort('-created').populate('repo', 'name description').populate('user', 'username').exec(function(err, figs) {
      if (err) {
        return res.json(500, {
          error: 'Cannot list the figs'
        });
      }
      res.json(figs);
    });
  });
};

/**
 * Show a fig by user and name
 */
exports.show = function(req, res) {
  console.log('hi' + req.params.user + req.params.name);
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Repo.findOne({name: req.params.name}, function(err, repo){
      var repoId = repo? repo._id:'';
      Fig.findOne({user: userId, repo: repoId}).populate('repo', 'name description').populate('user', 'username').exec(function(err, fig) {
      if (err || !fig) {
        return res.json(500, {
          error: 'Cannot list the fig'
        });
      }
      res.json(fig);
      });
    });
  });
};

// /**
//  * Show a fig by user, name and version
//  */
// exports.show = function(req, res) {
//   User.findOne({username: req.params.user}, function(err, user) {
//     var userId = user? user._id:'';
//     Fig.findOne({user: userId, name: req.params.name}).populate('user', 'username').exec(function(err, fig) {
//     if (err || !fig) {
//       return res.json(500, {
//         error: 'Cannot list the fig'
//       });
//     }
//     res.json(fig);
//     });
//   });
// };

