import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasepartyitemstComponent } from './purchasepartyitemst.component';

describe('PurchasepartyitemstComponent', () => {
  let component: PurchasepartyitemstComponent;
  let fixture: ComponentFixture<PurchasepartyitemstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasepartyitemstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasepartyitemstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
