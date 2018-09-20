// Actions to be tested
import * as types from './actionTypes';
import * as messageActions from './messageActions';

describe('Message Actions test', () => {
  test('Dispatches the correct action and payload', () => {
    const message = 'test';
    const expectedActions = {
      type: types.ADD_ERROR_MESSAGE,
      message,
    };

    const store = mockStore();
    expect(
      store.dispatch(messageActions.addErrorMessage(message))
    ).to.deep.equal(expectedActions);
  });
});
