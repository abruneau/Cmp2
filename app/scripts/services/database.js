'use strict';

var Datastore = require('nedb');
var Promise = require('bluebird');
Promise.promisifyAll(Datastore.prototype);

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name database
 * @description
 * # database
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('database', function() {

  var remote = require('electron').remote;
  var app = remote.app;
  var path = require('path');

  var db = new Datastore({
    filename: path.join(app.getPath('userData'), 'cmp.db'),
    autoload: true
  });

  db.ensureIndex({
    fieldName: 'Id'
  }, function(err) {
    if (err) {
      console.log(err);
    }
  });

  db.ensureIndex({
    fieldName: 'AccountId'
  }, function(err) {
    if (err) {
      console.log(err);
    }
  });

  return db;
});
