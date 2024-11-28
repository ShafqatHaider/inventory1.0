import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalemanwiseComponent } from './salemanwise.component';

describe('SalemanwiseComponent', () => {
  let component: SalemanwiseComponent;
  let fixture: ComponentFixture<SalemanwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalemanwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalemanwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
