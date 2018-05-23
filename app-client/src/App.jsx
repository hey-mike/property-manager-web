import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import AuthService from './core/services/auth.service';
import './App.css';

import LoginPage from './features/user/LoginPage';

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
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div>
        {AuthService.isUserAuthenticated() ? (
          <PrivateRoute path="/" component={App} />
        ) : (
          <div className="main">
            <TransitionGroup>
              <PageFade key={location.pathname}>
                <Switch location={location}>
                  <Route path="/login" component={LoginPage} />
                </Switch>
              </PageFade>
            </TransitionGroup>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
