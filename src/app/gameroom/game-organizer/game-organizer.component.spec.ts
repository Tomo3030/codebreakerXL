import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOrganizerComponent } from './game-organizer.component';

describe('GameOrganizerComponent', () => {
  let component: GameOrganizerComponent;
  let fixture: ComponentFixture<GameOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
