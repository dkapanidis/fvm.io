'use strict';

//Figs service used for figs REST endpoint
angular.module('mean.figs').factory('Figs', ['$resource',
  function($resource) {
    return $resource('/v1/figs/:figId', {
      figId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
