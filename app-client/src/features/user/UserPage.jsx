import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from './actions/authActions';
import LoginForm from './forms/LoginForm.jsx';

import './UserPage.css';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }
  signIn(values) {
    console.log('signin');
    this.props.dispatch(signIn(values, this.props.history));
  }
  signUp() {
    console.log('signin');
  }
  render() {
    return (
      <div className={classnames('wrapper')}>
        <div className="login-form-wrapper">
          <Switch>
            <Route
              path="/user/login"
              component={() => (
                <LoginForm
                  history={this.props.history}
                  onSubmit={this.signIn}
                />
              )}
            />
            <Route path="/user/signup" component={UserPage} />
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
