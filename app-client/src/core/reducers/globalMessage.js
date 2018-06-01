import * as types from '../actions/actionTypes';

// Updates error message to notify about the failed fetches.

const globalMessage = (state = null, action) => {
  switch (action.type) {
    case types.RESET_MESSAGE:
      return Object.assign({}, state, {
        success_message: '',
        error_message: '',
      });
    case types.ADD_SUCCESS_MESSAGE:
      return Object.assign({}, state, {
        success_message: action.message,
        error_message: '',
      });
    case types.ADD_ERROR_MESSAGE:
      return Object.assign({}, state, {
        success_message: '',
        error_message: action.message,
      });
    default:
      return state;
  }
};

export default globalMessage;
