import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from './App';
import GlobalMessage from './core/components/GlobalMessage';
import GlobalNotification from './core/components/GlobalNotification';
import HomePage from './features/home/HomePage';
import UserPage from './features/user/UserPage';

const NoMatch = () => <div>Can't find any route</div>;

describe('App --- Shallow Render REACT COMPONENTS', () => {
  // use shallow rendering
  it('shadow render without crashing', () => {
    shallow(<App />);
  });
  it('renders an `GlobalMessage` and `GlobalNotification`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(GlobalMessage)).to.have.lengthOf(1);
    expect(wrapper.find(GlobalNotification)).to.have.lengthOf(1);
  });
});
describe('App routes test', () => {
  test('invalid path should redirect to Home page', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(UserPage)).to.have.lengthOf(0);
    expect(wrapper.find(NoMatch)).to.have.lengthOf(1);
    expect(wrapper.find(HomePage)).to.have.lengthOf(1);
  });

  test('valid path should not redirect to 404', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(UserPage)).to.have.lengthOf(1);
    expect(wrapper.find(HomePage)).to.have.lengthOf(0);
  });
});
