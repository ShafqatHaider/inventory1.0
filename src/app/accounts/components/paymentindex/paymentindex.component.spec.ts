import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentindexComponent } from './paymentindex.component';

describe('PaymentindexComponent', () => {
  let component: PaymentindexComponent;
  let fixture: ComponentFixture<PaymentindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
