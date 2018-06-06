import React, { Component } from 'react';
import { Layout } from 'antd';
import SideNavMenu from './SideNavMenu';
import './Sidebar.css';

const { Sider } = Layout;

class SideMenu extends Component {
  render() {
    const { toggleSidebar } = this.props;

    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onCollapse={(collapsed, type) => {
          toggleSidebar(collapsed);
        }}>
        <div className="logo" />
        <SideNavMenu />
      </Sider>
    );
  }
}

export default SideMenu;
