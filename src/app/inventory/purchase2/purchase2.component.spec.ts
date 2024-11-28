import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchase2Component } from './purchase2.component';

describe('Purchase2Component', () => {
  let component: Purchase2Component;
  let fixture: ComponentFixture<Purchase2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Purchase2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Purchase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
