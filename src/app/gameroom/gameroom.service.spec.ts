import { TestBed } from '@angular/core/testing';

import { GameroomService } from './gameroom.service';

describe('GameroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameroomService = TestBed.get(GameroomService);
    expect(service).toBeTruthy();
  });
});
