import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinInfoComponent } from './join-info.component';

describe('JoinInfoComponent', () => {
  let component: JoinInfoComponent;
  let fixture: ComponentFixture<JoinInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
