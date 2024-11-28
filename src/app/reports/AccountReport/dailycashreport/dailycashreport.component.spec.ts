import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailycashreportComponent } from './dailycashreport.component';

describe('DailycashreportComponent', () => {
  let component: DailycashreportComponent;
  let fixture: ComponentFixture<DailycashreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailycashreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailycashreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
