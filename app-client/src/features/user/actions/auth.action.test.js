import * as actions from './authActions';
import * as types from './ActionTypes';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.ADD_TODO,
      text,
    };
    expect(actions.addTodo(text)).toEqual(expectedAction);
  });
});
