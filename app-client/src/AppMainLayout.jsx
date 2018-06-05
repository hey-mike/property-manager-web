import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import Toolbar from './features/main-layout/toolbar/Toolbar';
import Sidebar from './features/main-layout/sidebar/Sidebar';
import NavDrawer from './features/main-layout/nav-drawer/NavDrawer';
import DashboardPage from './features/dashboard/DashboardPage';
import Tenant from './features/tenant/Tenant';
import './AppMainLayout.css';

const { Content, Footer } = Layout;
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      date: '',
    };

    this.toggle = this.toggle.bind(this);
    this.setCollapsed = this.setCollapsed.bind(this);
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  setCollapsed(collapsed) {
    this.setState({
      collapsed: collapsed,
    });
  }

  render() {
    return (
      <div>
        <NavDrawer
          open={this.state.collapsed}
          setCollapsed={this.setCollapsed}
        />
        <Layout>
          <Sidebar
            open={this.state.collapsed}
            setCollapsed={this.setCollapsed}
          />
          <Layout>
            <Toolbar toggleMenu={this.toggle} open={this.state.collapsed} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Switch>
                  <Redirect exact from="/" to="/dashboard" />
                  <Route path="/dashboard" component={DashboardPage} />
                  <Route path="/tenant" component={Tenant} />
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
