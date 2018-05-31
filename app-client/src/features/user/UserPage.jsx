import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, register } from './actions/authActions';
import LoginForm from './forms/LoginForm.jsx';
import RegisterForm from './forms/RegisterForm';

import './UserPage.css';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  login(values) {
    console.log('login');
    this.props.dispatch(login(values, this.props.history));
  }
  register(values) {
    console.log('register');
    this.props.dispatch(register(values, this.props.history));
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
UserPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default withRouter(connect()(UserPage));
