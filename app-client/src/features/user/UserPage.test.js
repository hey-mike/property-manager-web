import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import UserPage from './UserPage';

describe('UserPage', () => {
  // tree rendering
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Full DOM  rendering
  it('full dom without crashing', () => {
    const wrapper = shallow(<UserPage />);
    expect(wrapper.find(UserPage)).to.have.lengthOf(1);
  });
});
