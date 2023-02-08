import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGameResultComponent } from './finished-game-result.component';

describe('FinishedGameResultComponent', () => {
  let component: FinishedGameResultComponent;
  let fixture: ComponentFixture<FinishedGameResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedGameResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedGameResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
