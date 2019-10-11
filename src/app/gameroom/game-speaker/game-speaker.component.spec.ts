import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpeakerComponent } from './game-speaker.component';

describe('GameSpeakerComponent', () => {
  let component: GameSpeakerComponent;
  let fixture: ComponentFixture<GameSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
