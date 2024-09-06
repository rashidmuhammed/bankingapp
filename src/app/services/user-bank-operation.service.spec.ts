import { TestBed } from '@angular/core/testing';

import { UserBankOperationService } from './user-bank-operation.service';

describe('UserBankOperationService', () => {
  let service: UserBankOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBankOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
