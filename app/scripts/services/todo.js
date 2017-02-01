'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name Todo
 * @description
 * # Todo
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('Todo', function(database) {

  var Todo = function(task, dueDate, AccountId) {
    this.attributes = {
      type: 'Todo'
    };
    this.task = task;
    this.dueDate = dueDate;
    this.AccountId = AccountId;
    this.completed = false;
  };

  Todo.prototype.add = function() {
    var self = this;
    return database.insertAsync(this).then(function(newDoc) {
      self._id = newDoc._id;
      return newDoc;
    });
  };

  Todo.prototype.update = function() {
    return database.updateAsync({
      _id: this._id
    }, this, {});
  };

  Todo.prototype.delete = function() {
    return database.removeAsync({
      _id: this._id
    }, {});
  };

  Todo.getAll = function(AccountId) {

    var query;
    if (AccountId) {
      query = {
        $and: [{
          "attributes.type": 'Todo'
        }, {
          "AccountId": AccountId
        }]
      };
    } else {
      query = {
        "attributes.type": 'Todo'
      };
    }

    return database.findAsync(query).then(function (todos) {
    	return todos.map(function (t) {
    		var todo = new Todo(t.task, t.dueDate, t.AccountId);
			todo._id = t._id;
			todo.completed = t.completed;
			return todo;
    	});
    });
  };

  return Todo;

});
