import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemledgerComponent } from './itemledger.component';

describe('ItemledgerComponent', () => {
  let component: ItemledgerComponent;
  let fixture: ComponentFixture<ItemledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemledgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
