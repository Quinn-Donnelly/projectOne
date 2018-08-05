/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import EmployeeHomePage from 'containers/EmployeeHomePage/Loadable';
import NavBar from 'containers/NavigationBar/Loadable';
import ManagerHomePage from 'containers/ManagerHomePage/Loadable';

export default function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path='/employeeHome' component={EmployeeHomePage} />
        <Route path='/managerHome' component={ManagerHomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
