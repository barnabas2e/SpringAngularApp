import { TestBed } from '@angular/core/testing';

import { CustumerServiceService } from './custumer-service.service';

describe('CustumerServiceService', () => {
  let service: CustumerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustumerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
