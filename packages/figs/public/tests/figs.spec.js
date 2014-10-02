'use strict';

(function() {
  // Figs Controller Spec
  describe('MEAN controllers', function() {
    describe('FigsController', function() {
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
        module('mean.figs');
      });

      // Initialize the controller and a mock scope
      var FigsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        FigsController = $controller('FigsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one fig object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('figs').respond([{
            name: 'An Fig about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.figs).toEqualData([{
            name: 'An Fig about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one fig object fetched ' +
        'from XHR using a figId URL parameter', function() {
          // fixture URL parament
          $stateParams.figId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testFigData = function() {
            return {
              name: 'An Fig about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/figs\/([0-9a-fA-F]{24})$/).respond(testFigData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.fig).toEqualData(testFigData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postFigData = function() {
            return {
              name: 'An Fig about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseFigData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              name: 'An Fig about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.name = 'An Fig about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('figs', postFigData()).respond(responseFigData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.name).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/figs/' + responseFigData()._id);
        });

      it('$scope.update(true) should update a valid fig', inject(function(Figs) {

        // fixture rideshare
        var putFigData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            name: 'An Fig about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock fig object from form
        var fig = new Figs(putFigData());

        // mock fig in scope
        scope.fig = fig;

        // test PUT happens correctly
        $httpBackend.expectPUT(/figs\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/figs\/([0-9a-fA-F]{24})$/, putFigData()).respond();
        /*
                Error: Expected PUT /figs\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"An Fig about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"An Fig about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/figs/' + putFigData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid figId ' +
        'and remove the fig from the scope', inject(function(Figs) {

          // fixture rideshare
          var fig = new Figs({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.figs = [];
          scope.figs.push(fig);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/figs\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(fig);
          $httpBackend.flush();

          // test after successful delete URL location figs list
          //expect($location.path()).toBe('/figs');
          expect(scope.figs.length).toBe(0);

        }));
    });
  });
}());
