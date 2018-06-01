import * as types from './actionTypes';

export const resetNotification = () => ({
  type: types.RESET_NOTIFICATION,
});

export const addSuccessNotification = message => {
  return {
    type: types.ADD_SUCCESS_NOTIFICATION,
    message,
  };
};
export const addErrorNotification = message => {
  console.log('message', message);
  return {
    type: types.ADD_ERROR_NOTIFICATION,
    message,
  };
};
