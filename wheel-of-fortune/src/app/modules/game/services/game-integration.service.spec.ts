import { TestBed } from '@angular/core/testing';

import { GameIntegrationService } from './game-integration.service';

describe('GameIntegrationService', () => {
  let service: GameIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
