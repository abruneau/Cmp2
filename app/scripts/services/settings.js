'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name Settings
 * @description
 * # Settings
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('Settings', function(database) {
  var self = this;

  var observerCallbacks = [];

  /**
   * Notify an observer when something changes
   */
  var notifyObservers = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };

  /**
   * Initiate the Settings document if it doesn't exist
   */
  function init() {
    var setting = {
      //   noteSaveMode: 'l',
      attributes: {
        type: 'Settings'
      }
    };

    database.insert(setting, function(err, newDoc) {
      if (err) {
        console.log(err);
      } else {
        self.settings = newDoc;
        notifyObservers();
      }
    });
  }

  /**
   * Update Settings
   * @param  {Object} set Setting object with new values
   */
  self.update = function(set) {
    database.update({
      _id: set._id
    }, set, {}, function(err) {
      if (!err) {
        self.settings = set;
        notifyObservers();
      } else {
        console.log(err);
      }
    });
  };

  /**
   * Get Settings from database
   */
  self.get = function() {
    database.findOne({
      "attributes.type": 'Settings'
    }, function(err, doc) {
      if (doc) {
        self.settings = doc;
        notifyObservers();
      } else if (err) {
        console.log(err);
      } else {
        init();
      }
    });
  };

  //register an observer
  self.registerObserverCallback = function(callback) {
    observerCallbacks.push(callback);
  };
  return self;
});
