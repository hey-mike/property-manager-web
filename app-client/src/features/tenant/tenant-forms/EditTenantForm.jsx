import React from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const EditTenantForm = props => {
  const { form } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Form layout={'horizontal'} onSubmit={props.onSubmit}>
      <FormItem label="First Name" {...formItemLayout}>
        {getFieldDecorator('firstName', {
          rules: [{ required: true, message: 'Please Enter your first name' }],
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
    </Form>
  );
};

export default Form.create()(EditTenantForm);
