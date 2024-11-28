import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasebillwiseComponent } from './purchasebillwise.component';

describe('PurchasebillwiseComponent', () => {
  let component: PurchasebillwiseComponent;
  let fixture: ComponentFixture<PurchasebillwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasebillwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasebillwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
