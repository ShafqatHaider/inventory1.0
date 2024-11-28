import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseitempartyComponent } from './purchaseitemparty.component';

describe('PurchaseitempartyComponent', () => {
  let component: PurchaseitempartyComponent;
  let fixture: ComponentFixture<PurchaseitempartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseitempartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseitempartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
