import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalewithstComponent } from './salewithst.component';

describe('SalewithstComponent', () => {
  let component: SalewithstComponent;
  let fixture: ComponentFixture<SalewithstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalewithstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalewithstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
