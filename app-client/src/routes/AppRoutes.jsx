import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router'
import { Breadcrumb, Alert } from 'antd';

import DashboardPage from '../components/dashboard/DashboardPage.jsx';
// import IssueList from './IssueList.jsx';
// import DeparmentPage from '../components/department/DepartmentPage.jsx';
// import DeparmentEdit from '../components/department/DepartmentEdit.jsx';

import EmployeePage from '../components/employee/EmployeePage.jsx';
import EmployeeEdit from '../components/employee/EmployeeEdit.jsx';

// import RelationPage from '../components/relation/RelationPage.jsx';

// import IssueReport from '../components/dashboard/IssueReport.jsx';

import SchedulePage from '../components/schedule/SchedulePage.jsx';



const NoMatch = () => <p>Page Not Found</p>;
const AppRoutes = (props) => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Route exact path="/dashboard" component={DashboardPage} />
    <Route exact path="/employee" component={EmployeePage} />
    <Route path="/employee/:id" component={EmployeeEdit} />
    <Route exact path="/schedule" component={SchedulePage} />
    <Route component={NoMatch} />
  </Switch>
)
export default AppRoutes;
