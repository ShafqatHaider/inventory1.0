import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalepartyitemstComponent } from './salepartyitemst.component';

describe('SalepartyitemstComponent', () => {
  let component: SalepartyitemstComponent;
  let fixture: ComponentFixture<SalepartyitemstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalepartyitemstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalepartyitemstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
