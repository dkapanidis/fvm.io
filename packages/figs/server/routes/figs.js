'use strict';

var figs = require('../controllers/figs');
var collections = require('../controllers/collections');

// Fig authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.fig.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Figs, app, auth) {

  app.route('/v1/figs')
    .get(figs.all)
    .post(auth.requiresLogin, figs.create);

  app.route('/v1/figs/:figId')
    .get(figs.show)
    .put(auth.requiresLogin, hasAuthorization, figs.update)
    .delete(auth.requiresLogin, hasAuthorization, figs.destroy);

  app.route('/v1/c/')
    .get(figs.all);

  app.route('/v1/c/:user')
    .get(collections.showFigsByUser);

  app.route('/v1/c/:user/:name/')
    .get(collections.showFigsByUserAndName);

  app.route('/v1/c/:user/:name/:version')
    .get(collections.showFigByUserNameAndVersion);

  // Finish with setting up the figId param
  app.param('figId', figs.fig);
};
