'use strict';

describe('Service: SOQL', function () {

  // load the service's module
  beforeEach(module('cmp2App'));

  // instantiate service
  var SOQL;
  beforeEach(inject(function (_SOQL_) {
    SOQL = _SOQL_;
  }));

  it('should do something', function () {
    expect(!!SOQL).toBe(true);
  });

});
