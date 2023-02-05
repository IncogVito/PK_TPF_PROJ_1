import { TestBed } from '@angular/core/testing';

import { GameDataResolverResolver } from './game-data-resolver.resolver';

describe('GameDataResolverResolver', () => {
  let resolver: GameDataResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GameDataResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
