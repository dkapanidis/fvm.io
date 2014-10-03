'use strict';

angular.module('mean.repos').controller('ReposController', ['$scope', '$stateParams', '$location', 'Global', 'Repos',
  function($scope, $stateParams, $location, Global, Repos) {
    $scope.global = Global;
    $scope.versions = [{
      version: '',
      file:''
    }];

    $scope.hasAuthorization = function(repo) {
      if (!repo || !repo.user) return false;
      return $scope.global.isAdmin || repo.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var repo = new Repos({
          name: this.name,
          versions: this.versions
        });
        repo.$save(function(response) {
          $location.path('repos/' + response._id);
        });

        this.name = '';
        this.versions = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(repo) {
      if (repo) {
        repo.$remove();

        for (var i in $scope.repos) {
          if ($scope.repos[i] === repo) {
            $scope.repos.splice(i, 1);
          }
        }
          $location.path('repos');
      } else {
        $scope.repo.$remove(function(response) {
          $location.path('repos');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var repo = $scope.repo;
        if (!repo.updated) {
          repo.updated = [];
        }
        repo.updated.push(new Date().getTime());

        repo.$update(function() {
          $location.path('repos/' + repo._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Repos.query(function(repos) {
        $scope.repos = repos;
      });
    };

    $scope.findOne = function() {
      Repos.get({
        repoId: $stateParams.repoId
      }, function(repo) {
        $scope.repo = repo;
      });
    };

    $scope.addVersion = function(repo) {
      this.versions.push({
        version: '',
        repo: ''
      });
    };
  }
]);
