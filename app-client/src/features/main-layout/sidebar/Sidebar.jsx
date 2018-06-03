import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './Sidebar.css';

const { Sider } = Layout;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { location } = this.props;

    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        collapsible>
        <div className="logo">
          {/* <img src="/images/logo.svg" alt="logo" /> */}
          {/* {this.props.collapsed ? '' : <span>{'EMS ADMIN'}</span>} */}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            location.pathname === '/' ? '/dashboard' : location.pathname,
          ]}
          onClick={item => this.handleClick(item)}>
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
