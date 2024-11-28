import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasewithstComponent } from './purchasewithst.component';

describe('PurchasewithstComponent', () => {
  let component: PurchasewithstComponent;
  let fixture: ComponentFixture<PurchasewithstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasewithstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasewithstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
