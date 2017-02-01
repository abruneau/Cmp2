'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name Todos
 * @description
 * # Todos
 */
angular.module('cmp2App').directive('todos', function () {
    return {
      templateUrl: 'views/todos.html',
      restrict: 'E',
      controller: 'TodosCtrl',
      controllerAs: 'todos'
    };
  });
