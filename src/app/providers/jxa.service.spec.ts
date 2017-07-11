import { TestBed, inject } from '@angular/core/testing';

import { JxaService } from './jxa.service';

describe('JxaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JxaService]
    });
  });

  it('should ...', inject([JxaService], (service: JxaService) => {
    expect(service).toBeTruthy();
  }));
});
