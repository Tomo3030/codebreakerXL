import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRejectComponent } from './partner-reject.component';

describe('PartnerRejectComponent', () => {
  let component: PartnerRejectComponent;
  let fixture: ComponentFixture<PartnerRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
