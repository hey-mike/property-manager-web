import React from 'react';

import { shallow } from 'enzyme';
import UserPage from './UserPage';
import LoginForm from './forms/LoginForm';

describe('UserPage', () => {
  // Full DOM  rendering
  it('full dom without crashing', () => {
    const wrapper = shallow(<UserPage />);
    console.log(wrapper);
    expect(wrapper.find(LoginForm)).to.have.lengthOf(1);
  });
});
