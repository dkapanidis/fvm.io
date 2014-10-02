'use strict';

var figs = require('../controllers/figs');

// Fig authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.fig.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Figs, app, auth) {

  app.route('/figs')
    .get(figs.all)
    .post(auth.requiresLogin, figs.create);
  // app.route('/figs/:figId')
    // .get(figs.show)
  app.route('/figs/:user')
    .get(figs.showUserFigs)
    .put(auth.requiresLogin, hasAuthorization, figs.update)
    .delete(auth.requiresLogin, hasAuthorization, figs.destroy);

  // Finish with setting up the figId param
  // app.param('user', figs.fig);
};
