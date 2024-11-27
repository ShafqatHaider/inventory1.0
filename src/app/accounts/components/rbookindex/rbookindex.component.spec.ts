import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbookindexComponent } from './rbookindex.component';

describe('RbookindexComponent', () => {
  let component: RbookindexComponent;
  let fixture: ComponentFixture<RbookindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RbookindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbookindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
