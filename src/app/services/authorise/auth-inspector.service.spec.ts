import { TestBed } from '@angular/core/testing';

import { AuthInspectorService } from './auth-inspector.service';

describe('AuthInspectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInspectorService = TestBed.get(AuthInspectorService);
    expect(service).toBeTruthy();
  });
});
