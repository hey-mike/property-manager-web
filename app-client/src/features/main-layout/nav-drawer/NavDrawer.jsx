import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './NavDrawer.css';
import Drawer from 'rc-drawer-menu';
import 'rc-drawer-menu/assets/index.css';

class NavDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onChange = bool => {
    console.log(bool);
  };
  onTouchEnd = () => {
    this.setState({
      open: false,
    });
  };
  onSwitch = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  onSelect(item) {
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { location, open, setCollapsed } = this.props;

    return (
      <Drawer
        onHandleClick={this.onChange}
        onChange={this.onChange}
        open={this.state.open}
        onMaskClick={this.onTouchEnd}
        handleChild={false}
        level={null}>
        <div className="logo" />
        <Menu
          style={{ width: 240 }}
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
      </Drawer>
    );
  }
}

NavDrawer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavDrawer);
