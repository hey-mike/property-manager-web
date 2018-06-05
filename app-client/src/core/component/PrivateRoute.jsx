import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/auth.service';

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

export default PrivateRoute;
