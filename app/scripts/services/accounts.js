'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name Accounts
 * @description
 * # Accounts
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('Accounts', function(database) {
  var self = this;

  var observerCallbacks = [];

  //call this when you know 'foo' has been changed
  var notifyObservers = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };

  self.accountList = [];
  self.opportunities = [];
  self.selectedAccount = null;

  /**
   * Update accout list from database
   * @memberof Accounts
   */
  self.updateList = function() {
    database.find({
      "attributes.type": 'Account'
    }, {
      Name: 1,
      Id: 1,
      _id: 0
    }, function(err, docs) {
      if (err) {
        console.log(err);
      }
      if (docs) {
        self.list = docs;
        notifyObservers();
      }
    });
  };

  self.insertAccount = function(account) {
    var ids = [];

    try {
      if (account.constructor === Array) {
        ids = account.map(function(a) {
          return a.Id;
        });
      } else {
        ids = [account.Id];
      }
    } catch (e) {
      console.log(e);
    }

    database.update({
      Id: {
        $in: ids
      }
    }, account, {
      upsert: true
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        self.updateList();
        if (ids.length === 1) {
          self.get(ids[0]);
        }
      }
    });
  };

  self.insertOpportunities = function(opportunity, id) {
    var ids = [];

    try {
      if (opportunity.constructor === Array) {
        ids = opportunity.map(function(a) {
          return a.Id;
        });
      } else {
        ids = [opportunity.Id];
      }
    } catch (e) {
      console.log(e);
    }

    database.update({
      Id: {
        $in: ids
      }
    }, opportunity, {
      upsert: true
    }, function(err) {
      if (err) {
        console.log(err);
      }
      self.getOpportunities(id);
    });

  };

  self.getOpportunities = function(id) {
    database.find({
      $and: [{
        "attributes.type": 'Opportunity'
      }, {
        "AccountId": id
      }]
    }, function(err, docs) {
      if (docs) {
        self.opportunities = docs;
        notifyObservers();
      }
      if (err) {
        console.log(err);
      }
    });
  };

  self.get = function(id) {
    database.findOne({
      Id: id
    }, function(err, doc) {
      if (doc) {
        self.selected = doc;
        notifyObservers();
        self.getOpportunities(id);
      }
      if (err) {
        console.log(err);
      }
    });
  };


  //register an observer
  self.registerObserverCallback = function(callback) {
    observerCallbacks.push(callback);
  };

  return self;
});
