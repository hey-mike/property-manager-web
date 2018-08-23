import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from './App';

describe('App', () => {
  // tree rendering
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // use shallow rendering
  it('full dom render without crashing', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(App)).to.have.lengthOf(1);
  });
});
