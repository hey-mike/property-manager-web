import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Badge } from 'antd';
import * as Constants from '../constant';
import AuthService from '../services/auth.service';

import './Toolbar.css';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const AdminMenu = props => (
  <Menu
    mode="horizontal"
    defaultSelectedKeys={['2']}
    className="header-item"
    onClick={props.handleClick}>
    <Menu.Item key="mail">
      <Badge count={5}>
        <Icon type="mail" />
      </Badge>
    </Menu.Item>
    <SubMenu
      title={
        <span>
          <Icon type="user" />
          {'guest'}
        </span>
      }>
      <Menu.Item key="logout">{'Logout'}</Menu.Item>
    </SubMenu>
  </Menu>
);

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if (e.key === 'logout') {
      AuthService.logout();
      this.props.history.replace({
        pathname: `/`,
      });
    }
  }
  render() {
    const { showBurger, location } = this.props;

    let title = Constants.MENU_ITEMS_DASHBOARD;
    switch (location.pathname) {
      case `/${Constants.MENU_ITEMS_TENANT.toLowerCase()}`:
        title = Constants.MENU_ITEMS_TENANT;
        break;
      case `/${Constants.MENU_ITEMS_CALENDAR.toLowerCase()}`:
        title = Constants.MENU_ITEMS_CALENDAR;
        break;
      case `/${Constants.MENU_ITEMS_SERVICE.toLowerCase()}`:
        title = Constants.MENU_ITEMS_SERVICE;
        break;
      default:
        title = Constants.MENU_ITEMS_DASHBOARD;
    }

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        {showBurger && (
          <Icon
            className={classNames('trigger', 'header-item')}
            type={this.props.open ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggleMenu}
          />
        )}
        <span className="toolbar-title">{title}</span>
        <AdminMenu handleClick={this.handleClick} />
      </Header>
    );
  }
}

Toolbar.prototypes = {
  toggleMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Toolbar);
