import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AuthService from './core/services/auth.service';
import './App.css';

import UserPage from './features/user/UserPage';
import DashboardPage from './features/dashboard/DashboardPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthService.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/user/login" />
      )
    }
  />
);

const NoMatch = () => <div>Can't find any route</div>;

class App extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div className="main">
        <Switch location={location}>
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <Route path="/user" component={UserPage} />
          <Redirect exact from="/" to="/dashboard" />
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
