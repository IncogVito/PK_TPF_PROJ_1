import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQuestionModalComponent } from './change-question-modal.component';

describe('ChangeQuestionModalComponent', () => {
  let component: ChangeQuestionModalComponent;
  let fixture: ComponentFixture<ChangeQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeQuestionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
