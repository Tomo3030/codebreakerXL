import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadySignedInComponent } from './already-signed-in.component';

describe('AlreadySignedInComponent', () => {
  let component: AlreadySignedInComponent;
  let fixture: ComponentFixture<AlreadySignedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadySignedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadySignedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
