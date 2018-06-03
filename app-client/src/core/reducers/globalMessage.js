import * as types from '../actions/actionTypes';

// Updates error MESSAGEto notify about the failed fetches.

const globalMessage = (state = null, action) => {
  switch (action.type) {
    case types.RESET_MESSAGE:
      return Object.assign({}, state, {
        success: '',
        error: '',
      });
    case types.ADD_SUCCESS_MESSAGE:
      return Object.assign({}, state, {
        success: action.message,
        error: '',
      });
    case types.ADD_ERROR_MESSAGE:
      return Object.assign({}, state, {
        success: '',
        error: action.message,
      });
    default:
      return state;
  }
};

export default globalMessage;
