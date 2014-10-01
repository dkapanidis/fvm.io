'use strict';

//Setting up route
angular.module('mean.figs').config(['$stateProvider',
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
      .state('all figs', {
        url: '/figs',
        templateUrl: 'figs/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create fig', {
        url: '/figs/create',
        templateUrl: 'figs/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit fig', {
        url: '/figs/:figId/edit',
        templateUrl: 'figs/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('fig by id', {
        url: '/figs/:figId',
        templateUrl: 'figs/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
