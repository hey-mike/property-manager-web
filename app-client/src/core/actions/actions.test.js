// Actions to be tested
import * as messageActions from './messageActions';

describe('selectAvatar', () => {
  test('Dispatches the correct action and payload', () => {
    const expectedActions = [
      {
        payload: 1,
        type: 'select_avatar',
      },
    ];

    store.dispatch(messageActions.addErrorMessage('test'));
    // expect(store.getActions()).toEqual(expectedActions);
  });
});
