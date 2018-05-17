import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHandler, HttpEvent, HttpInterceptor,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';


@Injectable()
export class AuthResponseInterceptService implements HttpInterceptor {

  currentRequest: HttpRequest<any>;

  constructor(
    private auth: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = (this.auth.isLoggedIn()) ? this.localStorage.getAuth().token : null;
    if (token) {
      // save current request
      this.currentRequest = request;

      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            // do nothing
          }
        }),
        catchError(error => this.handleError(error))
      );
    }
    return next.handle(request);
  }

  handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // JWT token might be expired:
        // try to get a new one using refresh token
        console.log('Token expired. Attempting refresh...');
        this.auth.refreshToken().subscribe(res => {
          if (res) {
            // refresh token successful
            console.log('refresh token successful');

            // re-submit the failed request
            return this.http.request(this.currentRequest).pipe(
              retry(3), // retry a failed request up to 3 times
              catchError(val => of(`I caught: ${val}`)) // then handle the error
            );

          } else {
            // refresh token failed
            console.log('refresh token failed');

            // erase current token
            this.auth.logout();

            // redirect to login page
            this.router.navigate(['login']);
          }
        }, error => console.log(error));
      }
    }
    return throwError(err);
  }
}
