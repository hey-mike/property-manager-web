import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PrivateRoute from './core/component/PrivateRoute';
import './App.css';

import GlobalNotification from './core/component/GlobalNotification';
import GlobalMessage from './core/component/GlobalMessage';
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
