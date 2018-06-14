import axios from '../axiosClient';
import LocalStorageService from './local-store.service';

export default class AuthService {
  static getEndPoint() {
    return `https://${window.location.hostname}/api`;
  }

  static async login(newUser) {
    return await axios.post(`/auth/login`, newUser);
  }

  static async register(newUser) {
    return await axios.post(`/auth/register`, newUser);
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
