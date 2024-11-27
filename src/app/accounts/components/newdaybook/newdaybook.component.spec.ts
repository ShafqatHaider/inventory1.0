import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdaybookComponent } from './newdaybook.component';

describe('NewdaybookComponent', () => {
  let component: NewdaybookComponent;
  let fixture: ComponentFixture<NewdaybookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewdaybookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewdaybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
