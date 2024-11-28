import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalepartyitemComponent } from './salepartyitem.component';

describe('SalepartyitemComponent', () => {
  let component: SalepartyitemComponent;
  let fixture: ComponentFixture<SalepartyitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalepartyitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalepartyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
