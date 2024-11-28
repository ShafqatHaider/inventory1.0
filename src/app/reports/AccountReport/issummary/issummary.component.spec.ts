import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssummaryComponent } from './issummary.component';

describe('IssummaryComponent', () => {
  let component: IssummaryComponent;
  let fixture: ComponentFixture<IssummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
