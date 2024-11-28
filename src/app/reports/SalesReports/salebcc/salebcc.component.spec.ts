import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebccComponent } from './salebcc.component';

describe('SalebccComponent', () => {
  let component: SalebccComponent;
  let fixture: ComponentFixture<SalebccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalebccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalebccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
