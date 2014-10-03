'use strict';

var repos = require('../controllers/repos');

// Repo authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.repo.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Repos, app, auth) {

  app.route('/v1/repos')
    .get(repos.all)
    .post(auth.requiresLogin, repos.create);

  app.route('/v1/repos/:repoId')
    .get(repos.show)
    .put(auth.requiresLogin, hasAuthorization, repos.update)
    .delete(auth.requiresLogin, hasAuthorization, repos.destroy);

  // Finish with setting up the repoId param
  app.param('repoId', repos.repo);
};
