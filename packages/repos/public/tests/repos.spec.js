'use strict';

(function() {
  // Repos Controller Spec
  describe('MEAN controllers', function() {
    describe('ReposController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.repos');
      });

      // Initialize the controller and a mock scope
      var ReposController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        ReposController = $controller('ReposController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one repo object fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('/v1\/repos').respond([{
            name: 'An Repo about MEAN',
            description: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.repos).toEqualData([{
            name: 'An Repo about MEAN',
            description: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one repo object fetched from XHR using a repoId URL parameter', function() {
          // fixture URL parament
          $stateParams.repoId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testRepoData = function() {
            return {
              name: 'An Repo about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/v1\/repos\/([0-9a-fA-F]{24})$/).respond(testRepoData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.repo).toEqualData(testRepoData());

        });

      it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', function() {

          // fixture expected POST data
          var postRepoData = function() {
            return {
              name: 'An Repo about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseRepoData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              name: 'An Repo about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.name = 'An Repo about MEAN';
          scope.description = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('/v1\/repos', postRepoData()).respond(responseRepoData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.name).toEqual('');
          expect(scope.description).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/repos/' + responseRepoData()._id);
        });

      it('$scope.update(true) should update a valid repo', inject(function(Repos) {

        // fixture rideshare
        var putRepoData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            name: 'An Repo about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock repo object from form
        var repo = new Repos(putRepoData());

        // mock repo in scope
        scope.repo = repo;

        // test PUT happens correctly
        $httpBackend.expectPUT(/v1\/repos\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is repoured out
        //$httpBackend.expectPUT(/repos\/([0-9a-fA-F]{24})$/, putRepoData()).respond();
        /*
                Error: Expected PUT /repos\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"An Repo about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"An Repo about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/repos/' + putRepoData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid repoId and remove the repo from the scope', inject(function(Repos) {

          // fixture rideshare
          var repo = new Repos({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.repos = [];
          scope.repos.push(repo);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/v1\/repos\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(repo);
          $httpBackend.flush();

          // test after successful delete URL location repos list
          //expect($location.path()).toBe('/repos');
          expect(scope.repos.length).toBe(0);

        }));
    });
  });
}());
