import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import AuthService from './core/services/auth.service';
import './App.css';

import UserPage from './features/user/UserPage';
import DashboardPage from './features/dashboard/DashboardPage';

const PageFade = props => {
  return (
    <CSSTransition
      {...props}
      classNames="fadeTranslate"
      timeout={1000}
      mountOnEnter={true}
      unmountOnExit={true}
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthService.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { location } = this.props;

    return (
      <div className="main">
        <TransitionGroup>
          <PageFade key={location.pathname}>
            <Switch location={location}>
              <PrivateRoute path="/dashboard" component={DashboardPage} />
              <Route path="/user" component={UserPage} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </PageFade>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(App);
