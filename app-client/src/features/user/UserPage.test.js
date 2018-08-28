import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import UserPage from './UserPage';
import LoginForm from './forms/LoginForm';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe('UserPage', () => {
  // Full DOM  rendering
  it('full dom without crashing', () => {
    const wrapper = shallow(<UserPage />);
    console.log(wrapper);
    expect(wrapper.find(LoginForm)).to.have.lengthOf(1);
  });
});
