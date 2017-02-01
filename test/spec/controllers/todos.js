'use strict';

describe('Controller: TodosCtrl', function () {

  // load the controller's module
  beforeEach(module('cmp2App'));

  var TodosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodosCtrl = $controller('TodosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TodosCtrl.awesomeThings.length).toBe(3);
  });
});
