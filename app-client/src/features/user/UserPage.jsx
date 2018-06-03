import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Route, withRouter } from 'react-router-dom';
import LoginForm from './forms/LoginForm.jsx';
import RegisterForm from './forms/RegisterForm';

import './UserPage.css';

class UserPage extends React.Component {
  componentDidMount() {
    console.log('UserPage');
  }
  render() {
    const { isFetching } = this.props;
    return (
      <div className={classnames('wrapper')}>
        <div className="login-form-wrapper">
          <Switch>
            <Route
              path="/user/login"
              component={() => (
                <LoginForm history={this.props.history} loading={isFetching} />
              )}
            />
            <Route
              path="/user/register"
              component={() => <RegisterForm history={this.props.history} />}
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

export default withRouter(UserPage);
