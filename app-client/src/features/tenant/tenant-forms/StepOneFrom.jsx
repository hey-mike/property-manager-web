import React from 'react';
import { Form, Input, Select, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class StepOneFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  render() {
    const { form } = this.props;
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

export default Form.create()(StepOneFrom);
