import { TestBed, inject } from '@angular/core/testing';

import { AuthRequestInterceptService } from './auth.request.intercept.service';

describe('AuthRequestInterceptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRequestInterceptService]
    });
  });

  it('should be created', inject([AuthRequestInterceptService], (service: AuthRequestInterceptService) => {
    expect(service).toBeTruthy();
  }));
});
