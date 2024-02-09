import { TestBed } from '@angular/core/testing';

import { AutopsyService } from './autopsy.service';

describe('AutopsyService', () => {
  let service: AutopsyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutopsyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
