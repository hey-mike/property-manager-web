import * as types from '../actions/actionTypes';

const initSate = {
  token: '',
  isFetching: false,
};
const auth = (state = initSate, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.AUTH_REQUEST_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
        isFetching: false,
      });

    case types.SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        token: action.data.token,
        isFetching: false,
        receivedAt: action.receivedAt,
      });

    case types.SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        receivedAt: action.receivedAt,
      });

    case types.SIGN_OUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        receivedAt: action.receivedAt,
      });
    default:
      return state;
  }
};

export default auth;
