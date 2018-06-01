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

  // static register(newUser) {
  //   const headers = Object.assign(
  //     {
  //       'Content-Type': 'application/json',
  //     },
  //     this.requestHeaders()
  //   );
  //   const url = this.getEndPoint();
  //   const request = new Request(`${url}/auth/register`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: headers,
  //     body: JSON.stringify(newUser),
  //   });

  //   console.log('signup', newUser);
  //   return fetch(request);
  // }
  static async register(newUser) {
    const url = this.getEndPoint();
    try {
      const response = await axios.post(`${url}/auth/register`, newUser);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // const headers = Object.assign(
    //   {
    //     'Content-Type': 'application/json',
    //   },
    //   this.requestHeaders()
    // );
    // const url = this.getEndPoint();
    // const request = new Request(`${url}/auth/register`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: headers,
    //   body: JSON.stringify(newUser),
    // });

    // console.log('signup', newUser);
    // return fetch(request);
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
