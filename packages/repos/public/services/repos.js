'use strict';

//Repos service used for repos REST endpoint
angular.module('mean.repos').factory('Repos', ['$resource',
  function($resource) {
    return $resource('/v1/repos/:repoId', {
      repoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
