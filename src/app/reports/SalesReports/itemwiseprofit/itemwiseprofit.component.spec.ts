import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwiseprofitComponent } from './itemwiseprofit.component';

describe('ItemwiseprofitComponent', () => {
  let component: ItemwiseprofitComponent;
  let fixture: ComponentFixture<ItemwiseprofitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemwiseprofitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemwiseprofitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
