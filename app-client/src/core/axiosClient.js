import axios from 'axios';
import LocalStorageService from './services/local-store.service';

const axiosClient = axios.create({
  baseURL: 'https://domain.com/foo/bar',
  /* other custom settings */
});
axiosClient.interceptors.request.use(
  function(config) {
    // Do something before request is sent\
    const token = LocalStorageService.getAuth();

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
