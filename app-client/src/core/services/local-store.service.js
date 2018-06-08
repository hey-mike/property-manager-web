import * as Constant from '../constant';

// export default LocalStore;
export default class LocalStorageService {
  // Persist auth into localStorage or removes it if a NULL argument is given
  static setAuth(auth) {
    if (auth) {
      localStorage.setItem(Constant.AUTH_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(Constant.AUTH_KEY);
    }
    return true;
  }

  // Retrieves the auth JSON object (or NULL if none)
  static getAuth() {
    const token = localStorage.getItem(Constant.AUTH_KEY);
    if (token) {
      console.log('token');
      return JSON.parse(token);
    } else {
      return null;
    }
  }

  static cleanAuth() {
    localStorage.removeItem('token');
  }
}
