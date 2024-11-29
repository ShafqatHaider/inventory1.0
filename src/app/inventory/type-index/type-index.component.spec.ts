import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIndexComponent } from './type-index.component';

describe('TypeIndexComponent', () => {
  let component: TypeIndexComponent;
  let fixture: ComponentFixture<TypeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
