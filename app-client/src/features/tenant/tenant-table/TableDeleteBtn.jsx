import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../../actions/employeeActions';


import { Modal, Button, Icon } from 'antd';

import ComplexForm from '../forms/ComplexForm.jsx';


class TableDeleteBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.delete = this.delete.bind(this);
  }
  delete() {
    console.log('this.props',this.props);
    const { dispatch, id } = this.props;
    dispatch(deleteEmployee(id));
  }
  showModal(e) {
    e.preventDefault();
  
    Modal.confirm({
      title: 'Warning',
      content: 'Are you sure you want to delete this employee?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk : this.delete
    });
  }
  handleCancel() {
    this.setState({ visible: false });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <span>
        <a href="#" onClick={this.showModal}>Delete</a>
      </span>
    )
  }
}
TableDeleteBtn.propTypes = {
  id: PropTypes.string.isRequired
};
export default withRouter(connect()(TableDeleteBtn));
