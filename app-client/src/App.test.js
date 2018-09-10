import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from './App';
import GlobalMessage from './core/components/GlobalMessage';
import GlobalNotification from './core/components/GlobalNotification';
import DashboardPage from './features/dashboard/DashboardPage';
import HomePage from './features/home/HomePage';

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
  test('invalid path should redirect to 404', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(HomePage)).to.have.lengthOf(1);
  });

  test('valid path should not redirect to 404', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const NoMatch = () => <div>Can't find any route</div>;
    expect(wrapper.find(DashboardPage)).to.have.lengthOf(1);
    expect(wrapper.find(NoMatch)).to.have.lengthOf(0);
  });
});
