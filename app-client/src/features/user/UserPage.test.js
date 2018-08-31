import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import UserPage from './UserPage';
import LoginForm from './forms/LoginForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('UserPage -- Shallow Render REACT COMPONENTS', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserPage />);
  });
  // Full DOM  rendering
  it('full dom without crashing', () => {
    shallow(<UserPage />);
  });
});
