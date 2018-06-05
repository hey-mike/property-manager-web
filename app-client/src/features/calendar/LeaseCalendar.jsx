import React from 'react';
import { connect } from 'react-redux';
import { Calendar, Alert, Modal } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddScheduleForm from './forms/AddScheduleForm.jsx';
import './LeaseCalendar.css';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'normal', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'normal', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'normal', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <span className={`event-${item.type}`}>●</span>
          {item.content}
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}
class LeaseCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
      visible: false,
    };

    this.onSelect = this.onSelect.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
  }

  onSelect(value) {
    this.setState({
      value,
      selectedValue: value,
    });
    this.setState({ visible: true });
  }
  onPanelChange(value) {
    this.setState({ value });
  }
  onClose() {
    this.setState({ visible: false });
  }

  onCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const name = {
        firstName: values.firstName,
        lastName: values.lastName,
      };
      delete values.firstName;
      delete values.lastName;
      values.name = name;
      values._id = this.props.id;

      const employee = Object.assign({}, values);
      if (values.completionDate) {
        const completionDate = new Date(values.completionDate);
        employee.completionDate = completionDate;
      }

      this.onClose();
    });
  }
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    const { value, selectedValue, visible, isFetching } = this.state;
    return (
      <div>
        <Alert
          message={`You selected date: ${selectedValue &&
            selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          value={value}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
        />
        <Modal
          wrapClassName="vertical-center-modal"
          visible={visible}
          title={'Add a new schedule'}
          okText="Add"
          onCancel={this.onClose}
          confirmLoading={isFetching}
          onOk={this.onCreate}
          closable={false}
          maskClosable={false}>
          <AddScheduleForm ref={this.saveFormRef} />
        </Modal>
      </div>
    );
  }
}
LeaseCalendar.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect()(LeaseCalendar);
