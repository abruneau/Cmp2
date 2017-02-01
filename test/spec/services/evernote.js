'use strict';

describe('Service: evernote', function () {

  // load the service's module
  beforeEach(module('cmp2App'));

  // instantiate service
  var evernote;
  beforeEach(inject(function (_evernote_) {
    evernote = _evernote_;
  }));

  it('should do something', function () {
    expect(!!evernote).toBe(true);
  });

});
