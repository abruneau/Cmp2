import { TestBed, inject } from '@angular/core/testing';

import { ThemeSpinnerService } from './theme-spinner.service';

describe('ThemeSpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeSpinnerService]
    });
  });

  it('should ...', inject([ThemeSpinnerService], (service: ThemeSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
