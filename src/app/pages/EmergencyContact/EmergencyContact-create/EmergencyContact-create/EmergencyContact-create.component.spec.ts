import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyContactCreateComponent } from './EmergencyContact-create.component';

describe('EmergencyContactCreateComponent', () => {
  let component: EmergencyContactCreateComponent;
  let fixture: ComponentFixture<EmergencyContactCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyContactCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyContactCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
