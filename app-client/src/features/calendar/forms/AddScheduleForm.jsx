import React from 'react'
import { Button, Form, Input, Radio, Select, DatePicker, TimePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;



const AddScheduleForm = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
        <Form layout={'horizontal'} onSubmit={props.onSubmit}>
            <FormItem label="Department"  {...formItemLayout}>
                {getFieldDecorator('department', {
                    rules: [{ required: true, message: 'Please Enter your first name' }],
                })(
                    <Select>
                        <Option value="hr">Human Resource</Option>
                        <Option value="it">IT</Option>
                    </Select>
                    )}
            </FormItem>
            <FormItem label="Employee"  {...formItemLayout}>
                {getFieldDecorator('employee', {
                    rules: [{ required: true, message: 'Please Enter your last name' }],
                })(
                    <Input />
                    )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Start Time"
            >
                {getFieldDecorator('startTime', {
                    rules: [{ type: 'object', required: true, message: 'Please select start time!' }]
                })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="End Time"
            >
                {getFieldDecorator('endTime', {
                    rules: [{ type: 'object', required: true, message: 'Please select end time!' }]
                })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
            </FormItem>
        </Form>
    );
};

export default Form.create()(AddScheduleForm);
