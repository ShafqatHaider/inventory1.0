import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaybookindexComponent } from './daybookindex.component';

describe('DaybookindexComponent', () => {
  let component: DaybookindexComponent;
  let fixture: ComponentFixture<DaybookindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaybookindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaybookindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
