import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRequestComponent } from './partner-request.component';

describe('PartnerRequestComponent', () => {
  let component: PartnerRequestComponent;
  let fixture: ComponentFixture<PartnerRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
