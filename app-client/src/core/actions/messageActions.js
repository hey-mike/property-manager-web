import * as types from './actionTypes';

export const resetMessage = () => ({
  type: types.RESET_NOTIFICATION,
});

export const addSuccessMessage = message => {
  return {
    type: types.ADD_SUCCESS_NOTIFICATION,
    message,
  };
};
export const addErrorMessage = message => {
  console.log('message', message);
  return {
    type: types.ADD_ERROR_NOTIFICATION,
    message,
  };
};
