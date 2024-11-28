import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebillwisestComponent } from './salebillwisest.component';

describe('SalebillwisestComponent', () => {
  let component: SalebillwisestComponent;
  let fixture: ComponentFixture<SalebillwisestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalebillwisestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalebillwisestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
