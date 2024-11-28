import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebillwiseComponent } from './salebillwise.component';

describe('SalebillwiseComponent', () => {
  let component: SalebillwiseComponent;
  let fixture: ComponentFixture<SalebillwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalebillwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalebillwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
