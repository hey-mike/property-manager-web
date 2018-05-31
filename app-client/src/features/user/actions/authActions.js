import * as types from './actionTypes';
import AuthService from '../../../core/services/auth.service';
import LocalStoreService from '../../../core/services/local-store.service';

import { notification } from 'antd';

export const authRequest = () => ({
  type: types.AUTH_REQUEST,
});
export const authRequestError = error => ({
  type: types.AUTH_REQUEST_ERROR,
  error: error,
  receivedAt: Date.now(),
});

export const signinSuccess = (data, history) => {
  // save the token
  LocalStoreService.authenticateUser(data.token);
  history.replace({
    pathname: `/`,
  });
  return {
    type: types.SIGN_IN_SUCCESS,
    data,
  };
};
export const signupSuccess = (data, history) => {
  history.replace({
    pathname: `/`,
  });
  return {
    type: types.SIGN_UP_SUCCESS,
    data,
  };
};
export const signoutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS,
});

export const login = (user, history) => {
  return dispatch => {
    dispatch(authRequest());
    AuthService.login(user)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            notification.error({
              message: error.message,
            });
          });
        }
        response.json().then(res => {
          dispatch(signinSuccess(res, history));
          notification.success({
            message: 'Sign In successfully',
          });
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        notification.error({
          message: errorMsg,
        });
      });
  };
};

export const register = (user, history) => {
  return dispatch => {
    dispatch(authRequest());

    AuthService.register(user)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            notification.error({
              message: error.message,
            });
          });
        }
        response.json().then(user => {
          dispatch(signupSuccess(user, history));
          notification.success({
            message: 'Sign Up successfully',
          });
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.errors}`;
        // dispatch(authRequestError(errorMsg))
        notification.error({
          message: errorMsg,
        });
      });
  };
};
