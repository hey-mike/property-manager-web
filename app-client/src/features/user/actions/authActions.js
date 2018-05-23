import * as types from './actionTypes'
import auth from '../services/auth';
import queryString from 'query-string';
import AuthStore from '../store/auth';

import {
  notification,
  message
} from 'antd';

export const authRequest = () => ({
  type: types.AUTH_REQUEST,
});
export const authRequestError = error => ({
  type: types.AUTH_REQUEST_ERROR,
  error: error,
  receivedAt: Date.now()
});

export const signinSuccess = (data, history) => {
  // save the token
  AuthStore.authenticateUser(data.token);
  history.replace({
    pathname: `/`
  })
  return {
    type: types.SIGN_IN_SUCCESS,
    data
  }
};
export const signupSuccess = (data, history) => {
  history.replace({
    pathname: `/`
  })
  return {
    type: types.SIGN_UP_SUCCESS,
    data
  }
};
export const signoutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS,
})

export const signin = (user, history) => {
  return dispatch => {
    dispatch(authRequest());
    auth.signin(user).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          notification.error({
            message: error.message
          });
        });
      }
      response.json().then(res => {
        dispatch(signinSuccess(res, history));
        notification.success({
          message: 'Sign In successfully'
        });
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      notification.error({
        message: errorMsg
      });
    });
  }
};

export const signup = (user, history) => {
  return dispatch => {
    dispatch(authRequest());

    auth.signup(user).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          notification.error({
            message: error.message
          });
        });
      }
      response.json().then(user => {
        dispatch(signupSuccess(user, history));
        notification.success({
          message: 'Sign Up successfully'
        });
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      // dispatch(authRequestError(errorMsg))
      notification.error({
        message: errorMsg
      });
    });
  }
};
