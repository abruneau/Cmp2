'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name localAccount
 * @description
 * # localAccount
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('localAccount', function(database) {
  var self = this;

  var observerCallbacks = [];

  //call this when you know 'foo' has been changed
  var notifyObservers = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };

  self.selected = null;
  self.list = [];

  self.updateList = function() {
    database.find({
      "attributes.type": 'LocalInfo'
    }, {}, function(err, docs) {
      if (err) {
        console.log(err);
      }
      if (docs) {
        self.list = docs;
        notifyObservers();
      }
    });
  };

  self.get = function(accountId) {
    database.findOne({
      accountId: accountId
    }, function(err, doc) {
      if (doc) {
        self.selected = doc;
        notifyObservers();
      }
      if (err) {
        console.log(err);
      }
    });
  };

  self.insert = function(info) {
    database.insert(info, function(err, newDoc) {
      if (!err && newDoc) {
        self.selected = newDoc;
        self.updateList();
        notifyObservers();
      } else {
        console.log(err);
      }
    });
  };

  self.update = function(info) {
    database.update({
      _id: info._id
    }, info, {}, function(err) {
      if (err) {
        console.log(err);
      } else {
        self.updateList();
      }
    });
  };

  //register an observer
  self.registerObserverCallback = function(callback) {
    observerCallbacks.push(callback);
  };

  return self;
});
