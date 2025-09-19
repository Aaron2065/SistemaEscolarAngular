import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTypeCreateComponent } from './pay-type-create.component';

describe('PayTypeCreateComponent', () => {
  let component: PayTypeCreateComponent;
  let fixture: ComponentFixture<PayTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayTypeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
