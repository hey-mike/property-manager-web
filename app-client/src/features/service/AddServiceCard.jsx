import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

class AddServiceCard extends React.Component {
  render() {
    return (
      <Card>
        <Icon type="plus" />
        <span>Add new service</span>
      </Card>
    );
  }
}
export default withRouter(AddServiceCard);
