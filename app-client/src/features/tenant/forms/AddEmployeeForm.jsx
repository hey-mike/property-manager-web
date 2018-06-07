import React from 'react';
import { Form, Input, Modal, Select, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddEmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      dataSource:
        !value || value.indexOf('@') >= 0
          ? []
          : [
              `${value}@gmail.com`,
              `${value}@hotmail.com`,
              `${value}@mycompany.com`,
            ],
    });
  }
  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form layout={'horizontal'}>
        <FormItem label="First Name" {...formItemLayout}>
          {getFieldDecorator('firstName', {
            rules: [
              { required: true, message: 'Please Enter your first name' },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Last Name" {...formItemLayout}>
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please Enter your last name' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="Age" {...formItemLayout}>
          {getFieldDecorator('age')(<Input type="number" />)}
        </FormItem>
        <FormItem label="Gender" {...formItemLayout}>
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Department" {...formItemLayout}>
          {getFieldDecorator('department', {
            rules: [
              {
                required: true,
                message: 'Please a department this employee belongs to',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Title" {...formItemLayout}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please employee title' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="Email" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your E-mail!' }],
          })(
            <AutoComplete
              dataSource={this.state.dataSource}
              onChange={this.handleChange}
              placeholder="Email"
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddEmployeeForm);
