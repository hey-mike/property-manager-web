import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createEmployee } from '../../../actions/employeeActions';
import { Button, Modal } from 'antd';
import AddEmployeeForm from '../forms/AddEmployeeForm.jsx';

class EmployeeAddTableItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFetching && !this.props.isFetching) {
      this.setState({ visible: false });
    }
  }
  showModal() {
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const name = {
        firstName: values.firstName,
        lastName: values.lastName,
      };
      const newEmployee = values;
      newEmployee.name = name;

      this.props.dispatch(createEmployee(newEmployee, this.props.history));
    });
  }
  saveFormRef(form) {
    this.form = form;
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add
        </Button>

        <AddEmployeeForm
          ref={this.saveFormRef}
          confirmLoading={this.props.isFetching}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
EmployeeAddTableItem.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { updatedEmployee, error, isFetching } = state.employeeState;
  return {
    updatedEmployee: updatedEmployee,
    isFetching: isFetching,
    error: error,
  };
};

export default withRouter(connect(mapStateToProps)(EmployeeAddTableItem));
