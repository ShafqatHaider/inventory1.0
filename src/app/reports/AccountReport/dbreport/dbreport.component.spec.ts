import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbreportComponent } from './dbreport.component';

describe('DbreportComponent', () => {
  let component: DbreportComponent;
  let fixture: ComponentFixture<DbreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
