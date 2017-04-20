import { TestBed, inject } from '@angular/core/testing';

import { SalesforceService } from './salesforce.service';

describe('SalesforceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesforceService]
    });
  });

  it('should ...', inject([SalesforceService], (service: SalesforceService) => {
    expect(service).toBeTruthy();
  }));
});
