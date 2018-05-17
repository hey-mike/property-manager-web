import { Injectable } from '@angular/core';
import * as Constant from '../constant';

@Injectable()
export class LocalStorageService {

  constructor() { }
  // Persist auth into localStorage or removes it if a NULL argument is given
  setAuth(auth: TokenResponse | null): boolean {
    if (auth) {
      localStorage.setItem(
        Constant.AUTH_KEY,
        JSON.stringify(auth));
    } else {
      localStorage.removeItem(Constant.AUTH_KEY);
    }
    return true;
  }

  // Retrieves the auth JSON object (or NULL if none)
  getAuth(): TokenResponse | null {
    const token = localStorage.getItem(Constant.AUTH_KEY);
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }
}
