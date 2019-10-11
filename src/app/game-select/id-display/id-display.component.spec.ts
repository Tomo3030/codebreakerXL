import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdDisplayComponent } from './id-display.component';

describe('IdDisplayComponent', () => {
  let component: IdDisplayComponent;
  let fixture: ComponentFixture<IdDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
