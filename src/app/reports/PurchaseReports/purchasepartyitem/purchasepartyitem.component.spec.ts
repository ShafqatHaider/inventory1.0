import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasepartyitemComponent } from './purchasepartyitem.component';

describe('PurchasepartyitemComponent', () => {
  let component: PurchasepartyitemComponent;
  let fixture: ComponentFixture<PurchasepartyitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasepartyitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasepartyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
