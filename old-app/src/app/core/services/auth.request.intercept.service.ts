import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRequestInterceptService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.injector.get(AuthService);
    const localStorage = this.injector.get(LocalStorageService);
    const token = (auth.isLoggedIn()) ? localStorage.getAuth().token : null;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

}
