import * as types from './actionTypes';
import AuthService from '../../../core/services/auth.service';
import LocalStoreService from '../../../core/services/local-store.service';

// import {
//   addSuccessNotification,
//   addErrorNotification,
// } from '../../../core/actions/notificationActions';
import {
  addSuccessMessage,
  addErrorMessage,
} from '../../../core/actions/messageActions';

export const authRequest = () => ({
  type: types.AUTH_REQUEST,
});
export const authRequestError = error => ({
  type: types.AUTH_REQUEST_ERROR,
  error: error,
  receivedAt: Date.now(),
});

export const loginSuccess = (data, history) => {
  // save the token
  LocalStoreService.setAuth(data.token);
  history.push({
    pathname: `/`,
  });
  return {
    type: types.SIGN_IN_SUCCESS,
    data,
  };
};
export const registerSuccess = (data, history) => {
  history.push({
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
  return async dispatch => {
    dispatch(authRequest());
    try {
      const response = await AuthService.login(user);
      dispatch(addSuccessMessage('Sign In successfully'));
      dispatch(loginSuccess(response.data, history));
    } catch (error) {
      console.error(error);
      const { data } = error.response;
      const errorMsg = `Error in sending data to server: ${data.message}`;
      dispatch(addErrorMessage(errorMsg));
      dispatch(authRequestError(errorMsg));
    }
  };
};

export const register = (user, history) => {
  return async dispatch => {
    dispatch(authRequest());
    try {
      const response = await AuthService.register(user);
      dispatch(registerSuccess(response.data, history));
      dispatch(addSuccessMessage('Register successfully'));
    } catch (error) {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      dispatch(addErrorMessage(errorMsg));
      dispatch(authRequestError(errorMsg));
    }
  };
};
