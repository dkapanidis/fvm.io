'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Fig = mongoose.model('Fig'),
  _ = require('lodash');


/**
 * Find fig by id
 */
exports.fig = function(req, res, next, id) {
  Fig.load(id, function(err, fig) {
    if (err) return next(err);
    if (!fig) return next(new Error('Failed to load fig ' + id));
    req.fig = fig;
    next();
  });
};

/**
 * Create an fig
 */
exports.create = function(req, res) {
  var fig = new Fig(req.body);
  fig.user = req.user;

  fig.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the fig'
      });
    }
    res.json(fig);

  });
};

/**
 * Update an fig
 */
exports.update = function(req, res) {
  var fig = req.fig;

  fig = _.extend(fig, req.body);

  fig.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the fig'
      });
    }
    res.json(fig);

  });
};

/**
 * Delete an fig
 */
exports.destroy = function(req, res) {
  var fig = req.fig;

  fig.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the fig'
      });
    }
    res.json(fig);

  });
};

/**
 * Show an fig
 */
exports.show = function(req, res) {
  res.json(req.fig);
};

/**
 * List of Figs
 */
exports.all = function(req, res) {
  Fig.find().sort('-created').populate('user', 'name username').exec(function(err, figs) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the figs'
      });
    }
    res.json(figs);

  });
};
