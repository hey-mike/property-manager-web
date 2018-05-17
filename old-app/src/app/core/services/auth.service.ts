import { EventEmitter, Inject, Injectable, PLATFORM_ID, Optional } from '@angular/core';
import { APP_BASE_HREF, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import handleError from '../http.error.handler';

import * as Constant from '../constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Application-Names': ['store', 'auth']
  })
};

@Injectable()
export class AuthService {
  private authTokenUrl = 'api/token/auth';  // URL to web api
  private facebookTokenUrl = 'api/token/facebook';

  authKey = 'auth';
  clientId = 'Athena';

  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string,
    @Inject(PLATFORM_ID) private platformId: any,
    private localStorageService: LocalStorageService) {
    this.authTokenUrl = `${origin}${this.authTokenUrl}`;
    this.facebookTokenUrl = `${origin}${this.facebookTokenUrl}`;
  }

  // performs the login
  login(email: string, password: string): Observable<TokenResponse> {
    const data = {
      username: email,
      password: password,
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: 'password',
      // space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.getAuthFromServer(this.authTokenUrl, data);
  }

  facebookLogin(data): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.facebookTokenUrl, data, httpOptions).pipe(
      tap((newuser: TokenResponse) => console.log('Login successful.')),
      catchError(handleError<TokenResponse>('facebookLogin'))
    );
  }
  // try to refresh token
  refreshToken(): Observable<TokenResponse> {
    const data = {
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: 'refresh_token',
      refresh_token: this.localStorageService.getAuth().refresh_token,
      // space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.getAuthFromServer(this.authTokenUrl, data);
  }

  // retrieve the access & refresh tokens from the server
  getAuthFromServer(url: string, data: any): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(url, data, httpOptions).pipe(
      tap(token => this.localStorageService.setAuth(token)),
      catchError(handleError<TokenResponse>('getToken'))
    );
  }

  // performs the logout
  logout(): boolean {
    this.localStorageService.setAuth(null);
    return true;
  }


  // Returns TRUE if the user is logged in, FALSE otherwise.
  isLoggedIn(): boolean {
    return this.localStorageService.getAuth() != null;
  }
}
