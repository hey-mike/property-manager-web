import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Tabs, message, notification, Avatar } from 'antd';
import EditEmployeeForm from '../forms/EditEmployeeForm.jsx';

const TabPane = Tabs.TabPane;

const TabNames = {
  '1': 'General',
  '2': 'Position',
  '3': 'Others',
};
class ModalTitle extends React.Component {
  render() {
    return (
      <div className="form-header">
        <Avatar style={{ backgroundColor: '#f56a00' }} size="large">
          {'ML'}
        </Avatar>
        <span style={{ paddingLeft: '15px' }}>
          <div>Worker Account</div>
          <div>Michael</div>
        </span>
      </div>
    );
  }
}
export default class ComplexForm extends React.Component {
  static dataFetcher(id) {
    return fetch(`api/employee/${id}`).then(response => {
      if (!response.ok)
        return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ EmployeeEdit: data }));
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      title: 'General',
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    // console.log('ComplexForm componentDidMount');
    // this.loadData();
  }
  componentDidUpdate(prevProps) {
    // console.log('ComplexForm componentDidMount');
    // if (this.props.visible) {
    //   this.loadData();
    // }
  }
  loadData() {
    this.setState({ isFetching: true });
    ComplexForm.dataFetcher(this.props.id)
      .then(data => {
        const employee = data.EmployeeEdit;
        employee.createdAt = new Date(employee.createdAt);
        employee.completionDate =
          employee.completionDate != null
            ? this.formatDate(employee.completionDate)
            : null;
        console.log('employee.completionDate', employee.completionDate);

        this.setState({ employee });
        this.setState({ isFetching: false });
      })
      .catch(err => {
        notification.error({
          message: `Error in fetching data from server: ${err.message}`,
        });
      });
  }
  onChange(key) {
    console.log(key);
    this.setState({ title: TabNames[key] });
  }
  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    return (
      <Modal
        visible={visible}
        title={<ModalTitle />}
        okText="Update"
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        onOk={onCreate}
        closable={false}
        maskClosable={false}>
        <Tabs defaultActiveKey="1" onChange={this.onChange} tabPosition="left">
          <TabPane tab={TabNames['1']} key="1">
            {' '}
            <EditEmployeeForm />
          </TabPane>
          <TabPane tab={TabNames['2']} key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab={TabNames['3']} key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}
ComplexForm.propTypes = {
  id: PropTypes.string.isRequired,
};
