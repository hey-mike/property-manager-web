import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from './actions/authActions';
import LoginForm from './forms/LoginForm.jsx';
import RegisterForm from './forms/RegisterForm';

import './UserPage.css';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  login(values) {
    console.log('login');
    this.props.dispatch(signIn(values, this.props.history));
  }
  register() {
    console.log('register');
  }
  render() {
    return (
      <div className={classnames('wrapper')}>
        <div className="login-form-wrapper">
          <Switch>
            <Route
              exact
              path="/user/login"
              component={() => (
                <LoginForm history={this.props.history} onSubmit={this.login} />
              )}
            />
            <Route
              exact
              path="/user/register"
              component={() => (
                <RegisterForm
                  history={this.props.history}
                  onSubmit={this.register}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
UserPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default connect()(UserPage);
