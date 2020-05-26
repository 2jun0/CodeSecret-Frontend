import { TestBed } from '@angular/core/testing';

import { SecretKeyService } from './secret-key.service';

describe('SecretKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecretKeyService = TestBed.get(SecretKeyService);
    expect(service).toBeTruthy();
  });
});
