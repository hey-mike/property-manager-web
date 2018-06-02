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
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onLogin(values) {
    this.props.dispatch(login(values, this.props.history));
  }
  onRegister(values) {
    this.props.dispatch(register(values, this.props.history));
  }
  render() {
    console.log(this.props);
    return (
      <div className={classnames('wrapper')}>
        <div className="login-form-wrapper">
          <Switch>
            <Route
              path="/user/login"
              component={() => (
                <LoginForm
                  history={this.props.history}
                  onLogin={this.onLogin}
                />
              )}
            />
            <Route
              path="/user/register"
              component={() => (
                <RegisterForm
                  history={this.props.history}
                  onSubmit={this.onRegister}
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
