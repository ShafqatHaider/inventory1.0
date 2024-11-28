import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeIndexComponent } from './code-index.component';

describe('CodeIndexComponent', () => {
  let component: CodeIndexComponent;
  let fixture: ComponentFixture<CodeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
