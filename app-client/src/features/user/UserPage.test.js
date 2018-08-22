import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import UserPage from './UserPage';

// mock local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('UserPage', () => {
  // tree rendering
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Full DOM  rendering
  it('full dom without crashing', () => {
    const wrapper = mount(<UserPage />);
    expect(wrapper.find(UserPage)).to.have.lengthOf(1);
  });
});
