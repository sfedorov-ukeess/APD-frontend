import { TestBed } from '@angular/core/testing';

import { GlobalSignalService } from './global-signal-service.service';

describe('GlobalSignalService', () => {
  let service: GlobalSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
