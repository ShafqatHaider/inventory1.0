import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrbookComponent } from './newrbook.component';

describe('NewrbookComponent', () => {
  let component: NewrbookComponent;
  let fixture: ComponentFixture<NewrbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewrbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewrbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
