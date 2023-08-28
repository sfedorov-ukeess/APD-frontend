import { TestBed } from '@angular/core/testing';

import { GlobalSignalServiceService } from './global-signal-service.service';

describe('GlobalSignalServiceService', () => {
  let service: GlobalSignalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSignalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
