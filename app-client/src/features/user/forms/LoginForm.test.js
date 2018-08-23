import React from 'react';

import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  // Full DOM  rendering
  it('full dom without crashing', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('LoginForm')).to.have.lengthOf(1);
  });
});
