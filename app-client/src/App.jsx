import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { location } = this.props;

    return (
      <div className="main">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          {/* <Route path="/about" component={About} />
          <Route path="/:user" component={User} />
          <Route component={NoMatch} /> */}
        </Switch>
        {/* <TransitionGroup>
          <PageFade key={location.pathname}>
            <Switch location={location}>
              <Route path="/login" component={LoginPage} />
            </Switch>
          </PageFade>
        </TransitionGroup> */}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  // getVisibleTodos() always returns a new array, and so the
  // 'visibleToDos' prop will always reference a different array,
  // causing the wrapped component to re-render, even if the array's
  // values haven't changed
  visibleToDos: state.todos,
});
export default withRouter(connect(mapStateToProps)(App));
