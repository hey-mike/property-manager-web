import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Badge } from 'antd';
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
    const { showBurger } = this.props;

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        {showBurger && (
          <Icon
            className={classNames('trigger', 'header-item')}
            type={this.props.open ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggleMenu}
          />
        )}
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
