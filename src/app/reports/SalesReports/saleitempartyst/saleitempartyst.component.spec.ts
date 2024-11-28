import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleitempartystComponent } from './saleitempartyst.component';

describe('SaleitempartystComponent', () => {
  let component: SaleitempartystComponent;
  let fixture: ComponentFixture<SaleitempartystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleitempartystComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleitempartystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
