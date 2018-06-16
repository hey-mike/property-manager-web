import React from 'react';
import { Form, Input, Select, AutoComplete, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
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
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk(value) {
    console.log('onOk: ', value);
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
        <FormItem label="Check In" {...formItemLayout}>
          {getFieldDecorator('checkin-date', {
            rules: [{ required: true, message: 'Please Pick a date!' }],
          })(
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={this.onChange}
              onOk={this.onOk}
            />
          )}
        </FormItem>
        <FormItem label="Check Out" {...formItemLayout}>
          {getFieldDecorator('checkout-date', {
            rules: [{ required: true, message: 'Please Pick a date!' }],
          })(
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={this.onChange}
              onOk={this.onOk}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddEmployeeForm);
