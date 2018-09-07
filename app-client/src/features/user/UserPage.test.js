import React from 'react';
import { shallow } from 'enzyme';
import UserPage from './UserPage';
import LoginForm from './forms/LoginForm';

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
