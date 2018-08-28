import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
const middlewares = [thunk];
const store = configureMockStore(middlewares);

describe('LoginForm', () => {
  // Full DOM  rendering
  it('full dom without crashing', () => {
    const wrapper = shallow(<LoginForm />, { context: store });
    expect(wrapper.find('LoginForm')).to.have.lengthOf(1);
  });
});
