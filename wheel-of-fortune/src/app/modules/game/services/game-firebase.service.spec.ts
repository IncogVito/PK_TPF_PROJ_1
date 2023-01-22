import { TestBed } from '@angular/core/testing';

import { GameFirebaseService } from './game-firebase.service';

describe('GameFirebaseService', () => {
  let service: GameFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
