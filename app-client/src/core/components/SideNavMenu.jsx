import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import * as Constants from '../constant';

class SideNavMenu extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(item) {
    const { toggle } = this.props;
    if (toggle) toggle();
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { location } = this.props;

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[
          location.pathname === '/' ? '/dashboard' : location.pathname,
        ]}
        onClick={item => this.onSelect(item)}>
        <Menu.Item key="/dashboard">
          <Icon type="appstore-o" />
          <span>{Constants.MENU_ITEMS_DASHBOARD}</span>
        </Menu.Item>
        <Menu.Item key="/finance">
          <Icon type="solution" />
          <span>{Constants.MENU_ITEMS_FINANCE}</span>
        </Menu.Item>
        <Menu.Item key="/tenant">
          <Icon type="team" />
          <span>{Constants.MENU_ITEMS_TENANT}</span>
        </Menu.Item>
        <Menu.Item key="/calendar">
          <Icon type="schedule" />
          <span>{Constants.MENU_ITEMS_CALENDAR}</span>
        </Menu.Item>
        <Menu.Item key="/service">
          <Icon type="info-circle-o" />
          <span>{Constants.MENU_ITEMS_SERVICE}</span>
        </Menu.Item>
      </Menu>
    );
  }
}

SideNavMenu.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SideNavMenu);
