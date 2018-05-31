// import axios from 'axios';
import LocalStorageService from './local-store.service';

export default class AuthService {
  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }
  static getEndPoint() {
    return 'api';
  }
  static signIn(user) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const url = this.getEndPoint();
    const request = new Request(`${url}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(user),
    });

    return fetch(request);
  }

  static signUp(newUser) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const url = this.getEndPoint();
    const request = new Request(`${url}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(newUser),
    });

    console.log('signup', newUser);
    return fetch(request);
  }

  static logout() {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const url = this.getEndPoint();
    const request = new Request(`${url}/auth/signout`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
    });

    return fetch(request);
  }

  static isUserAuthenticated() {
    return LocalStorageService.getAuth() != null;
  }
}
