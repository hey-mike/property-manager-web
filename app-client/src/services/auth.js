export default class auth {
  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }
  static getEndPoint() {
    return process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : '';
  }
  static signin(user) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const url = this.getEndPoint();
    const request = new Request(`${url}/auth/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(user),
    });

    return fetch(request);
  }

  static signup(newUser) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const url = this.getEndPoint();
    const request = new Request(`${url}/auth/signup`, {
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
}
