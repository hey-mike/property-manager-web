import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { signIn } from './actions/authActions';
import LoginForm from './forms/LoginForm.jsx';

import './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }
  signIn(values) {
    this.props.dispatch(signIn(values, this.props.history));
  }
  signUp() {}
  render() {
    return (
      <div className={classnames('wrapper')}>
        <div className="login-form-wrapper">
          <LoginForm history={this.props.history} onSubmit={this.signIn()} />
        </div>
      </div>
    );
  }
}
LoginPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default connect(LoginPage);
