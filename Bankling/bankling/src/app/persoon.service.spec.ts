import { TestBed } from '@angular/core/testing';

import { PersoonService } from './persoon.service';

describe('PersoonService', () => {
  let service: PersoonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
