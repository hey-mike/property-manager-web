import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import Toolbar from './core/components/Toolbar';
import Sidebar from './core/components/Sidebar';
import NavDrawer from './core/components/NavDrawer';
import DashboardPage from './features/dashboard/DashboardPage';
import Tenant from './features/tenant/Tenant';
import LeaseCalendar from './features/calendar/LeaseCalendar';
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
    this.disableSider = this.disableSider.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  disableSider(disable) {
    this.setState({
      showSider: disable,
    });
  }

  render() {
    return (
      <div className="parent-demo">
        <NavDrawer open={this.state.collapsed} toggle={this.toggle} />
        <Layout>
          <Sidebar disableSider={this.disableSider} />
          <Layout>
            <Toolbar
              toggleMenu={this.toggle}
              showBurger={this.state.showSider}
            />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Switch>
                  <Redirect exact from="/" to="/dashboard" />
                  <Route path="/dashboard" component={DashboardPage} />
                  <Route path="/tenant" component={Tenant} />
                  <Route path="/calendar" component={LeaseCalendar} />
                </Switch>
              </div>
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
