'use strict';

describe('Filter: megaNumber', function () {

  // load the filter's module
  beforeEach(module('cmp2App'));

  // initialize a new instance of the filter before each test
  var megaNumber;
  beforeEach(inject(function ($filter) {
    megaNumber = $filter('megaNumber');
  }));

  it('should return the input prefixed with "megaNumber filter:"', function () {
    var text = 'angularjs';
    expect(megaNumber(text)).toBe('megaNumber filter: ' + text);
  });

});
