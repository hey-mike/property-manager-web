import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from './App';
import HomePage from './HomePage';
import UserPage from './features/user/UserPage';
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
  // it('renders an `Home Page`', () => {
  //   const wrapper = shallow(<App />);
  //   expect(wrapper.find(HomePage)).to.have.lengthOf(1);
  // });
});
describe('App routes test', () => {
  test('invalid path should redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(UserPage)).to.have.lengthOf(1);
    expect(wrapper.find(HomePage)).to.have.lengthOf(0);
  });

  test('valid path should not redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(UserPage)).to.have.lengthOf(1);
    expect(wrapper.find(HomePage)).to.have.lengthOf(0);
  });
});
