import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleitempartyComponent } from './saleitemparty.component';

describe('SaleitempartyComponent', () => {
  let component: SaleitempartyComponent;
  let fixture: ComponentFixture<SaleitempartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleitempartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleitempartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
