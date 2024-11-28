import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeindexComponent } from './codeindex.component';

describe('CodeindexComponent', () => {
  let component: CodeindexComponent;
  let fixture: ComponentFixture<CodeindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
