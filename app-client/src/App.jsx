import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute';
import GlobalNotification from './core/components/GlobalNotification';
import GlobalMessage from './core/components/GlobalMessage';
import './App.css';

import AppMainLayout from './AppMainLayout';
import UserPage from './features/user/UserPage';

const NoMatch = () => <div>Can't find any route</div>;

class App extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div className="main">
        <GlobalMessage />
        <GlobalNotification />
        <Switch location={location}>
          <Route path="/user" component={UserPage} />
          <PrivateRoute path="/" component={AppMainLayout} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
