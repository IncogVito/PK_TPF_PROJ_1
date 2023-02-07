import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacuumPageComponent } from './vacuum-page.component';

describe('VacuumPageComponent', () => {
  let component: VacuumPageComponent;
  let fixture: ComponentFixture<VacuumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacuumPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacuumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
