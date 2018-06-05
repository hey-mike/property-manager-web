import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
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
    const { location, open, setCollapsed } = this.props;

    return (
      <Sider breakpoint="lg" collapsedWidth="0" trigger={null}>
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
            <span>Dashboard</span>
          </Menu.Item>

          <Menu.Item key="/tenant">
            <Icon type="team" />
            <span>Tanents</span>
          </Menu.Item>
          <Menu.Item key="/calendar">
            <Icon type="schedule" />
            <span>Calendar</span>
          </Menu.Item>
          <Menu.Item key="/service">
            <Icon type="info-circle-o" />
            <span className="nav-text">Services</span>
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
