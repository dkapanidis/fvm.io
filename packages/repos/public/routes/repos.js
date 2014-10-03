'use strict';

//Setting up route
angular.module('mean.repos').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all repos', {
        url: '/repos',
        templateUrl: 'repos/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create repo', {
        url: '/repos/create',
        templateUrl: 'repos/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit repo', {
        url: '/repos/:repoId/edit',
        templateUrl: 'repos/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('repo by id', {
        url: '/repos/:repoId',
        templateUrl: 'repos/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
