import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../../actions/authActions';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(signin(values, this.props.history));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="Login" style={{ width: '400px' }}>
        <div className="login-form">
          <div className="login-form-header">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }]
              })(
                <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
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
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Link className="login-form-forgot" to="/forget">
                Forgot password
              </Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to="/signup">register now!</Link>
            </FormItem>
          </Form>
        </div>
      </Card>
    );
  }
}
LoginForm.prototypes = {
<<<<<<< HEAD:app-client/src/features/user/forms/LoginForm.jsx
  history: PropTypes.object.isRequired,
  form: PropTypes.any.isRequired
=======
  history: PropTypes.object.isRequired
>>>>>>> ca6ca23cba533200e517bef74b47b850e8abc416:app-client/src/features/user/forms/LoginForm.jsx
};

export default connect()(Form.create()(LoginForm));
