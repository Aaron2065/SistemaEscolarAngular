import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTypeListComponent } from './pay-type-list.component';

describe('PayTypeListComponent', () => {
  let component: PayTypeListComponent;
  let fixture: ComponentFixture<PayTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
