import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcodeComponent } from './newcode.component';

describe('NewcodeComponent', () => {
  let component: NewcodeComponent;
  let fixture: ComponentFixture<NewcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
