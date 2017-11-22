import { TestBed, inject } from '@angular/core/testing';

import { ExternalNoteService } from './external-note.service';

describe('ExternalNoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalNoteService]
    });
  });

  it('should be created', inject([ExternalNoteService], (service: ExternalNoteService) => {
    expect(service).toBeTruthy();
  }));
});
