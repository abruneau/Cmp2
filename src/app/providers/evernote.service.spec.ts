import { TestBed, inject } from '@angular/core/testing';

import { EvernoteService } from './evernote.service';

describe('EvernoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvernoteService]
    });
  });

  it('should be created', inject([EvernoteService], (service: EvernoteService) => {
    expect(service).toBeTruthy();
  }));
});
