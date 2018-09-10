import * as actions from './authActions';
import * as types from './ActionTypes';

describe('auth actions', () => {
  it('should create an auth request', () => {
    const expectedAction = {
      type: types.AUTH_REQUEST,
    };
    expect(actions.authRequest()).to.deep.equal(expectedAction);
  });
});
