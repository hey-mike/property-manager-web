import axios from 'axios';
import LocalStorageService from '../services/local-store.service';

axios.interceptors.request.use(
  function(config) {
    const token = LocalStorageService.getAuth();

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
