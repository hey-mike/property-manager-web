import * as types from '../actions/actionTypes';

// Updates error NOTIFICATIONto notify about the failed fetches.

const globalNotification = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case types.RESET_NOTIFICATION:
      return Object.assign({}, state, {
        success: '',
        error: '',
      });
    case types.ADD_SUCCESS_NOTIFICATION:
      return Object.assign({}, state, {
        success: action.message,
        error: '',
      });
    case types.ADD_ERROR_NOTIFICATION:
      return Object.assign({}, state, {
        success: '',
        error: action.message,
      });
    default:
      return state;
  }
};

export default globalNotification;
