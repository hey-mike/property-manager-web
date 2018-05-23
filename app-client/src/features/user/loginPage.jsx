import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import qs from 'query-string';
import { signin } from '../../actions/authActions';
import LoginForm from './forms/LoginForm.jsx';

import './Login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }
  signIn() {}
  signUp() {}
  render() {
    return (
      <div className={classnames('wrapper')}>
        <div className="login-form-wrapper">
          <LoginForm history={this.props.history} />
        </div>
      </div>
    );
  }
}
LoginPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default LoginPage;
