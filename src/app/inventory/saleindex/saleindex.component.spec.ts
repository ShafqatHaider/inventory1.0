import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleindexComponent } from './saleindex.component';

describe('SaleindexComponent', () => {
  let component: SaleindexComponent;
  let fixture: ComponentFixture<SaleindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
