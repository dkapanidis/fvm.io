'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Repo = mongoose.model('Repo'),
  User = mongoose.model('User'),
  _ = require('lodash');


/**
 * Find repo by id
 */
exports.repo = function(req, res, next, id) {
  Repo.load(id, function(err, repo) {
    if (err) return next(err);
    if (!repo) return next(new Error('Failed to load repo ' + id));
    req.repo = repo;
    next();
  });
};

/**
 * Create an repo
 */
exports.create = function(req, res) {
  var repo = new Repo(req.body);
  repo.user = req.user;

  repo.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the repo'
      });
    }
    res.json(repo);

  });
};

/**
 * Update an repo
 */
exports.update = function(req, res) {
  var repo = req.repo;

  repo = _.extend(repo, req.body);

  repo.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the repo'
      });
    }
    res.json(repo);

  });
};

/**
 * Delete an repo
 */
exports.destroy = function(req, res) {
  var repo = req.repo;

  repo.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the repo'
      });
    }
    res.json(repo);

  });
};

/**
 * Show an repo
 */
exports.show = function(req, res) {
  res.json(req.repo);
};

/**
 * List of repos from user
 */
exports.showUserRepos = function(req, res) {
  User.findOne({username: req.params.user}, function(err, user) {
    var userId = user? user._id:'';
    Repo.find({user: userId}).sort('-created').populate('user', 'name username').exec(function(err, repos) {
      if (err) {
        return res.json(500, {
          error: 'Cannot list the repos'
        });
      }
      res.json(repos);
    });
  });
};

/**
 * List of Repos
 */
exports.all = function(req, res) {
  Repo.find().sort('-created').populate('user', 'name username').exec(function(err, repos) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the repos'
      });
    }
    res.json(repos);

  });
};
