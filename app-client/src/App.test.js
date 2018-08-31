import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import HomePage from './HomePage';
import GlobalMessage from './core/components/GlobalMessage';

describe('App --- Shallow Render REACT COMPONENTS', () => {
  // use shallow rendering
  it('shadow render without crashing', () => {
    shallow(<App />);
  });
  it('renders an `GlobalMessage`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(GlobalMessage)).to.have.lengthOf(1);
  });
});
