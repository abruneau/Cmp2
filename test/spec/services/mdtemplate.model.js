'use strict';

describe('Service: mdTemplate.model', function () {

  // load the service's module
  beforeEach(module('cmp2App'));

  // instantiate service
  var mdTemplate.model;
  beforeEach(inject(function (_mdTemplate.model_) {
    mdTemplate.model = _mdTemplate.model_;
  }));

  it('should do something', function () {
    expect(!!mdTemplate.model).toBe(true);
  });

});
