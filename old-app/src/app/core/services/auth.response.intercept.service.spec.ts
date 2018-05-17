import { TestBed, inject } from '@angular/core/testing';

import { AuthResponseInterceptService } from './auth.response.intercept.service';

describe('Auth.Response.InterceptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthResponseInterceptService]
    });
  });

  it('should be created', inject([AuthResponseInterceptService], (service: AuthResponseInterceptService) => {
    expect(service).toBeTruthy();
  }));
});
