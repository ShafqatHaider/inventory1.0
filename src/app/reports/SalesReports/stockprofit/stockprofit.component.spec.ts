import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockprofitComponent } from './stockprofit.component';

describe('StockprofitComponent', () => {
  let component: StockprofitComponent;
  let fixture: ComponentFixture<StockprofitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockprofitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockprofitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
