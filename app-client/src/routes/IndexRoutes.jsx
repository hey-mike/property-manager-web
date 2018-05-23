import React from 'react';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Particles from 'react-particles-js';
import { config } from "./ParticleConfig";
import App from '../containers/App.jsx'
import LoginPage from "../containers/LoginPage.jsx";
import SignUpPage from "../containers/SignUpPage.jsx";
import Auth from '../store/auth';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
);
const PageFade = (props) => {
  return (
    <CSSTransition
      {...props}
      classNames="fadeTranslate"
      timeout={1000}
      mountOnEnter={true}
      unmountOnExit={true}
    />
  )
};
const IndexRoutes = ({ match, history, location }) => (
  <div>
    {Auth.isUserAuthenticated()
      ? <PrivateRoute path="/" component={App} />
      : <div>
        <Particles params={config} />
        <TransitionGroup>
          <PageFade key={location.pathname}>
            <Switch location={location}>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Redirect path="/" to="/login" />
            </Switch>
          </PageFade>
        </TransitionGroup>
      </div>
    }
  </div>
)
export default withRouter(IndexRoutes);
