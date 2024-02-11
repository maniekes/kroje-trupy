import { TestBed } from '@angular/core/testing';

import { AutoComplementService } from './auto-complement.service';

describe('AutoComplementService', () => {
  let service: AutoComplementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoComplementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
