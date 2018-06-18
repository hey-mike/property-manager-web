import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import Toolbar from './core/components/Toolbar';
import Sidebar from './core/components/Sidebar';
import NavDrawer from './core/components/NavDrawer';
import DashboardPage from './features/dashboard/DashboardPage';
import TenantPage from './features/tenant/TenantPage';
import LeaseCalendar from './features/calendar/LeaseCalendar';
import ServicePage from './features/service/ServicePage';
import './AppMainLayout.css';

const { Content, Footer } = Layout;
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      showSider: false,
      date: '',
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      showSider: !this.state.showSider,
    });
  }
  toggleSidebar(collapsed) {
    this.setState({
      collapsed: collapsed,
    });
    if (!collapsed) {
      this.setState({
        showSider: false,
      });
    }
  }

  render() {
    return (
      <div className="parent-demo">
        {this.state.collapsed && (
          <NavDrawer open={this.state.showSider} toggle={this.toggle} />
        )}
        <Layout>
          <Sidebar toggleSidebar={this.toggleSidebar} />
          <Layout>
            <Toolbar
              toggleMenu={this.toggle}
              showBurger={this.state.collapsed}
            />
            <Content style={{ margin: '24px 16px 0' }}>
              <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/tenant" component={TenantPage} />
                <Route path="/calendar" component={LeaseCalendar} />
                <Route path="/service" component={ServicePage} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
MainContainer.prototypes = {
  history: PropTypes.object.isRequired,
};

export default connect()(MainContainer);
