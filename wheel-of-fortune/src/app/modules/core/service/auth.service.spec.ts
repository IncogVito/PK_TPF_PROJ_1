import { TestBed } from '@angular/core/testing';

import { AuthUtilService } from './auth-util.service';

describe('AuthService', () => {
  let service: AuthUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
