import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItempartystComponent } from './itempartyst.component';

describe('ItempartystComponent', () => {
  let component: ItempartystComponent;
  let fixture: ComponentFixture<ItempartystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItempartystComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItempartystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
