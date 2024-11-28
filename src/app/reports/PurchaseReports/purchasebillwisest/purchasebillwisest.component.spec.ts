import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasebillwisestComponent } from './purchasebillwisest.component';

describe('PurchasebillwisestComponent', () => {
  let component: PurchasebillwisestComponent;
  let fixture: ComponentFixture<PurchasebillwisestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasebillwisestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasebillwisestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
