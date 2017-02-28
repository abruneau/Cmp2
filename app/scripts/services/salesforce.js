'use strict';

var jsforce = require('jsforce');

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name salesForce
 * @description
 * # salesForce
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('salesForce', function(database, SOQL, Accounts) {
  var self = this;

  function Sf() {
    this.setting = 'sf';
    this.loginUrl = '';
    this.email = '';
    this.password = '';
    this.token = '';
  }

  function Identity() {
    this.setting = 'identity';
  }

  var observerCallbacks = [];

  //call this when you know 'foo' has been changed
  var notifyObservers = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };

  self.settings = new Sf();
  self.identity = new Identity();
  self.connected = false;

  var connection;

  function initSetting() {
    database.insert(self.settings, function(err, newDoc) { // Callback is optional
      if (!err && newDoc) {
        self.settings = newDoc;
        notifyObservers();
      } else {
        console.log(err);
      }
    });
  }

  function initIdentity() {
    database.insert(self.identity, function(err, newDoc) { // Callback is optional
      if (!err && newDoc) {
        self.identity = newDoc;
        notifyObservers();
      } else {
        console.log(err);
      }
    });
  }

  function settingsAreComplit() {
    if (self.settings._id && self.settings.loginUrl && self.settings.email && self.settings.password && self.settings.token) {
      return true;
    } else {
      return false;
    }
  }

  function connect() {
    if (settingsAreComplit) {
      connection = new jsforce.Connection({
        loginUrl: self.settings.loginUrl
      });
    }

    return connection.login(self.settings.email, self.settings.password.concat(self.settings.token))
      .then(function() {
        self.connected = true;
        notifyObservers();
        return;
      }, function(err) {
        console.log(err);
      });

  }

  var getSettings = function() {
    database.findOne({
      setting: 'sf'
    }, function(err, doc) {
      if (doc) {
        self.settings = doc;
        connect();
        notifyObservers();
      } else if (err) {
        console.log(err);
      } else {
        initSetting();
      }
    });
  };

  function getIdentity() {
    database.findOne({
      setting: 'identity'
    }, function(err, doc) {
      if (doc) {
        self.identity = doc;
        notifyObservers();
      } else if (err) {
        console.log(err);
      } else {
        initIdentity();
      }
    });
  }

  self.updateIndentity = function() {
    if (self.connected) {
      connection.identity(function(err, res) {
        if (err) {
          return console.error(err);
        }
        res._id = self.identity._id;
        res.setting = self.identity.setting;
        database.update({
          _id: self.identity._id
        }, res, {}, function(err) {
          if (!err) {
            self.identity = res;
            notifyObservers();
          } else {
            console.log(err);
          }
        });
      });
    }
  };


  self.countAccounts = function() {
    return database.countAsync({
        "attributes.type": 'Account'
      })
      .then(function(res) {
        return res;
      }, function(err) {
        console.log(err);
      });
  };

  self.query = function(query) {
    return connection.query(query);
  };

  function initAccounts() {
    self.countAccounts().then(function(count) {
      if (count === 0) {
        return self.query(SOQL.preloadAccounts(self.identity.display_name));
      }
    }).then(function(res) {
      if (res) {
        Accounts.insertAccount(res.records);
      }
    }, function(err) {
      console.log(err);
    });
  }


  self.update = function(set) {
    database.updateAsync({
        _id: set._id
      }, set, {})
      .then(function() {
        self.settings = set;
        notifyObservers();
        return connect();
      })
      .then(function() {
        self.updateIndentity();
        initAccounts();
      }, function(err) {
        console.log(err);
      });
  };

  self.loadOpportunities = function(id) {
    self.query(SOQL.loadOpportunity(id)).then(function(res) {
      if (res.records) {
        Accounts.insertOpportunities(res.records, id);
      }
    }, function(err) {
      console.log(err);
    });
  };

  self.loadAccount = function(id) {
    return self.query(SOQL.loadAccount(id)).then(function(res) {
      if (res) {
        Accounts.insertAccount(res.records[0]);
      }
    }, function(err) {
      console.log(err);
    });
  };

  self.findAccountByName = function(name) {
    return self.query(SOQL.findAccountByName(name));
  };

  self.loadForcastBoard = function() {
    return database.findOneAsync({
      setting: 'identity'
    }).then(function(identity) {
      if (self.connected) {
        return self.query(SOQL.forcastBoard(identity.display_name));
      } else {
        return false;
      }
    });
  };



  //register an observer
  self.registerObserverCallback = function(callback) {
    observerCallbacks.push(callback);
  };

  getSettings();
  getIdentity();

  return self;
});
