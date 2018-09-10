import React from 'react';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch } from 'react-router-dom';

const Loading = () => <div>Loading...</div>;

const DashboardPage = Loadable({
  loader: () => import('../dashboard/DashboardPage'),
  loading: Loading,
});
const TenantPage = Loadable({
  loader: () => import('../tenant/TenantPage'),
  loading: Loading,
});
const LeaseCalendarPage = Loadable({
  loader: () => import('../calendar/LeaseCalendarPage'),
  loading: Loading,
});

const ServicePage = Loadable({
  loader: () => import('../service/ServicePage'),
  loading: Loading,
});

const FinancePage = Loadable({
  loader: () => import('../finance/FinancePage'),
  loading: Loading,
});

const appMainRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/finance" component={FinancePage} />
    <Route path="/tenant" component={TenantPage} />
    <Route path="/calendar" component={LeaseCalendarPage} />
    <Route path="/service" component={ServicePage} />
  </Switch>
);
export default appMainRoutes;
