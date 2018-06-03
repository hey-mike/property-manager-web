import axios from 'axios';
import LocalStorageService from './local-store.service';

export default class AuthService {
  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }
  static getEndPoint() {
    return `https://${window.location.hostname}/api`;
  }

  static async login(newUser) {
    const url = this.getEndPoint();
    return await axios.post(`${url}/auth/login`, newUser);
  }

  static async register(newUser) {
    const url = this.getEndPoint();
    return await axios.post(`${url}/auth/register`, newUser);
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
    console.log('LocalStorageService.getAuth()', LocalStorageService.getAuth());
    return LocalStorageService.getAuth() != null;
  }
}
