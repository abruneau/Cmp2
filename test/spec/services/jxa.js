'use strict';

describe('Service: jxa', function () {

  // load the service's module
  beforeEach(module('cmp2App'));

  // instantiate service
  var jxa;
  beforeEach(inject(function (_jxa_) {
    jxa = _jxa_;
  }));

  it('should do something', function () {
    expect(!!jxa).toBe(true);
  });

});
