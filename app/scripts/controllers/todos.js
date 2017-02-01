'use strict';

/**
 * @memberof cmp2App
 * @ngdoc controller
 * @name TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('TodosCtrl', function(Todo, $scope, $routeParams, $filter) {

  /* global moment */

  var accountId = $routeParams.id;

  if (accountId) {
    $scope.isAccountPage = true;
  } else {
    $scope.isAccountPage = false;
  }

  $scope.todos = [];
  $scope.newTodo = "";
  $scope.editedTodo = null;

  Todo.getAll(accountId).then(function(todos) {
    $scope.$apply(function() {
      $scope.todos = todos;
    });
  }, function(err) {
    console.log(err);
  });

  $scope.$watch('todos', function() {
    $scope.remainingCount = $filter('filter')($scope.todos, {
      completed: false
    }).length;
    $scope.completedCount = $scope.todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
  }, true);

  $scope.changeStatus = function(stat) {
    var status = $scope.status = stat || '';
    $scope.statusFilter = (status === 'active') ? {
      completed: false
    } : (status === 'completed') ? {
      completed: true
    } : {};
  };

  $scope.addTodo = function() {

    if (!$scope.newTodo.task) {
      return;
    }

    var newTodo = new Todo($scope.newTodo.task.trim(), $scope.newTodo.dueDate, accountId);
    newTodo.add().then(function() {
      $scope.todos.push(newTodo);
      $scope.newTodo = "";
    }, function(err) {
      console.log(err);
    });
  };

  $scope.removeTodo = function(todo) {
    todo.delete().catch(function(err) {
      console.log(err);
    });
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);
  };

  $scope.toggleCompleted = function(todo, completed) {
    if (angular.isDefined(completed)) {
      todo.completed = completed;
    }
    todo.update().catch(function(err) {
      console.log(err);
    });
  };

  $scope.clearCompletedTodos = function() {
    $scope.todos.forEach(function(todo) {
      if (todo.completed) {
        $scope.removeTodo(todo);
      }
    });
  };

  $scope.markAll = function(completed) {
    $scope.todos.forEach(function(todo) {
      if (todo.completed !== completed) {
        $scope.toggleCompleted(todo, completed);
      }
    });
  };

  $scope.formatDate = function(date) {
    date = moment(date);
    return date.calendar();
  };

  $scope.editTodo = function(todo) {
    $scope.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    $scope.originalTodo = angular.copy(todo);
  };

  $scope.revertEdits = function(todo) {
    $scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
    $scope.editedTodo = null;
    $scope.originalTodo = null;
    $scope.reverted = true;
  };

  $scope.saveEdits = function(todo, event) {
    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && $scope.saveEvent === 'submit') {
      $scope.saveEvent = null;
      return;
    }

    $scope.saveEvent = event;

    if ($scope.reverted) {
      // Todo edits were reverted-- don't save.
      $scope.reverted = null;
      return;
    }

    todo.task = todo.task.trim();

    if (todo.task === $scope.originalTodo.task && todo.dueDate === $scope.originalTodo.dueDate) {
      $scope.editedTodo = null;
      return;
    }

    if (todo.task) {
      todo.update().catch(function(err) {
        console.log(err);
      });
      $scope.editedTodo = null;
    } else {
      todo.delete().catch(function(err) {
        console.log(err);
      });
      var index = $scope.todos.indexOf(todo);
      $scope.todo.splice(index, 1);
    }
  };

});
