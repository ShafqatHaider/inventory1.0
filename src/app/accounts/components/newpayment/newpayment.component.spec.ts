import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpaymentComponent } from './newpayment.component';

describe('NewpaymentComponent', () => {
  let component: NewpaymentComponent;
  let fixture: ComponentFixture<NewpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewpaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
