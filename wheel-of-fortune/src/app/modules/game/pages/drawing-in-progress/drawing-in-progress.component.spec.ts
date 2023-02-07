import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingInProgressComponent } from './drawing-in-progress.component';

describe('DrawingInProgressComponent', () => {
  let component: DrawingInProgressComponent;
  let fixture: ComponentFixture<DrawingInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
