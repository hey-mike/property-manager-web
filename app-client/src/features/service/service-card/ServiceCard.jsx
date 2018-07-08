import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import './ServiceCard.css';
const { Meta } = Card;

class ServiceCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }

  render() {
    const { title, description } = this.props;
    return (
      <Card actions={[<Icon type="mail" />, <Icon type="phone" />]}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={title}
          description={description}
        />
      </Card>
    );
  }
}
ServiceCard.prototypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(ServiceCard);
