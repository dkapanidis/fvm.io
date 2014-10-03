'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Fig = mongoose.model('Fig'),
  User = mongoose.model('User');

/**
 * Show a fig by user and name
 */
exports.show = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Fig.findOne({user: userId, name: req.params.name}).populate('user', 'username').exec(function(err, fig) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the fig'
      });
    }
    res.json(fig);
    });
  });
};

/**
 * List of figs by user
 */
exports.showUserFigs = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Fig.find({user: userId}).sort('-created').populate('user', 'username').exec(function(err, figs) {
      if (err) {
        return res.json(500, {
          error: 'Cannot list the figs'
        });
      }
      res.json(figs);
    });
  });
};