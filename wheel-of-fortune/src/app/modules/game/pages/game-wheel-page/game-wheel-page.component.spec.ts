import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWheelPageComponent } from './game-wheel-page.component';

describe('GameWheelPageComponent', () => {
  let component: GameWheelPageComponent;
  let fixture: ComponentFixture<GameWheelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameWheelPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameWheelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
