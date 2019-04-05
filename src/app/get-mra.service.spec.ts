import { TestBed } from '@angular/core/testing';

import { GetMRAService } from './get-mra.service';

describe('GetMRAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMRAService = TestBed.get(GetMRAService);
    expect(service).toBeTruthy();
  });
});
