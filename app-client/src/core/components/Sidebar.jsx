import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import * as Constants from '../constant';
import './Sidebar.css';

const { Sider } = Layout;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(item) {
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { location, disableSider } = this.props;

    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onCollapse={(collapsed, type) => {
          disableSider(collapsed);
        }}>
        <div className="logo" />
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
      </Sider>
    );
  }
}

SideMenu.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SideMenu);
