import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login(values, this.props.history));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="Login" style={{ width: '400px' }}>
        <div className="login-form">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Link className="login-form-forgot" to="/forget">
                Forgot password
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Log in
              </Button>
              Or <Link to="/user/register">register now!</Link>
            </FormItem>
          </Form>
        </div>
      </Card>
    );
  }
}
LoginForm.prototypes = {
  isFetching: PropTypes.bool.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const authState = state.auth;
  return {
    isFetching: authState.isFetching,
  };
};
const LoginFormContainer = Form.create()(LoginForm);
export default connect(mapStateToProps)(LoginFormContainer);
