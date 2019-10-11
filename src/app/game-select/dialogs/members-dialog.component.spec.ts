import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDialogComponent } from './members-dialog.component';

describe('MembersDialogComponent', () => {
  let component: MembersDialogComponent;
  let fixture: ComponentFixture<MembersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
