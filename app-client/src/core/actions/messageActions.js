import * as types from './actionTypes';

export const resetMessage = () => ({
  type: types.RESET_MESSAGE,
});

export const addSuccessMessage = message => {
  return {
    type: types.ADD_SUCCESS_MESSAGE,
    message,
  };
};
export const addErrorMessage = message => {
  return {
    type: types.ADD_ERROR_MESSAGE,
    message,
  };
};
