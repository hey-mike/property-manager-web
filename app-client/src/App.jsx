import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AuthService from './core/services/auth.service';
import './App.css';

import GlobalNotification from './core/component/GlobalNotification';
import GlobalMessage from './core/component/GlobalMessage';
import MainContainer from './features/main-layout/MainContainer';
import UserPage from './features/user/UserPage';
// import DashboardPage from './features/dashboard/DashboardPage';

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
  componentDidMount() {
    console.log('App componentDidMount');
  }
  componentDidUpdate() {
    console.log('App componentDidUpdate');
  }
  render() {
    const { location } = this.props;

    return (
      <div className="main">
        <GlobalMessage />
        <GlobalNotification />
        <Switch location={location}>
          <PrivateRoute path="/" component={MainContainer} />
          <Route path="/user" component={UserPage} />
          {/* <Redirect exact from="/" to="/dashboard" /> */}
          {/* <Route path="/dashboard" component={DashboardPage} /> */}
          {/* <Route path="/tenant" component={EmployeePage} />
          <Route path="/tenant/:id" component={EmployeeEdit} />
          <Route exact path="/schedule" component={SchedulePage} /> */}
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
