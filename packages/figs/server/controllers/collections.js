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
exports.showFigsByUser = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Fig.find({user: userId}).sort('-created').populate('repo', 'name description').populate('user', 'username').exec(function(err, figs) {
      if (err || !figs) {
        return res.json(500, {
          error: 'Cannot list the figs'
        });
      }
      res.json(figs);
    });
  });
};

/**
 * Show figs by user and name
 */
exports.showFigsByUserAndName = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Repo.findOne({name: req.params.name}, function(err, repo){
      var repoId = repo? repo._id:'';
      Fig.find({user: userId, repo: repoId}).populate('repo', 'name description').populate('user', 'username').exec(function(err, figs) {
      if (err || !figs) {
        return res.json(500, {
          error: 'Cannot list the figs'
        });
      }
      res.json(figs);
      });
    });
  });
};

/**
 * Show a fig by user, name and version
 */
exports.showFigByUserNameAndVersion = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Repo.findOne({name: req.params.name}, function(err, repo){
      var repoId = repo? repo._id:'';
      Fig.findOne({user: userId, repo: repoId, version: req.params.version}).populate('repo', 'name description').populate('user', 'username').exec(function(err, fig) {
      if (err || !fig) {
        return res.json(500, {
          error: 'Cannot list the fig'
        });
      }
      res.send(fig.content);
      });
    });
  });
};

