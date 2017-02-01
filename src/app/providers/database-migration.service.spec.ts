import { TestBed, inject } from '@angular/core/testing';

import { DatabaseMigrationService } from './database-migration.service';

describe('DatabaseMigrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseMigrationService]
    });
  });

  it('should be created', inject([DatabaseMigrationService], (service: DatabaseMigrationService) => {
    expect(service).toBeTruthy();
  }));
});
