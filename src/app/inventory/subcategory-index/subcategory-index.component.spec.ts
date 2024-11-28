import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryIndexComponent } from './subcategory-index.component';

describe('SubcategoryIndexComponent', () => {
  let component: SubcategoryIndexComponent;
  let fixture: ComponentFixture<SubcategoryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoryIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
