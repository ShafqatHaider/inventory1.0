import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseitempartystComponent } from './purchaseitempartyst.component';

describe('PurchaseitempartystComponent', () => {
  let component: PurchaseitempartystComponent;
  let fixture: ComponentFixture<PurchaseitempartystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseitempartystComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseitempartystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
