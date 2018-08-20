import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const DashboardPage = Loadable({
  loader: () => import('./features/dashboard/DashboardPage'),
  loading: Loading,
});
const TenantPage = Loadable({
  loader: () => import('./features/tenant/TenantPage'),
  loading: Loading,
});
const LeaseCalendarPage = Loadable({
  loader: () => import('./features/calendar/LeaseCalendarPage'),
  loading: Loading,
});

const ServicePage = Loadable({
  loader: () => import('./features/service/ServicePage'),
  loading: Loading,
});

const FinancePage = Loadable({
  loader: () => import('./features/finance/FinancePage'),
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
