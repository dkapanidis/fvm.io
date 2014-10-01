'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Fig = mongoose.model('Fig');

/**
 * Globals
 */
var user;
var fig;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Fig:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        fig = new Fig({
          title: 'Fig Title',
          content: 'Fig Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return fig.save(function(err) {
          should.not.exist(err);
          fig.title.should.equal('Fig Title');
          fig.content.should.equal('Fig Content');
          fig.user.should.not.have.length(0);
          fig.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        fig.title = '';

        return fig.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        fig.content = '';

        return fig.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        fig.user = {};

        return fig.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      fig.remove();
      user.remove();
      done();
    });
  });
});
