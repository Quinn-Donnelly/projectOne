import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeHomePage state domain
 */

const selectEmployeeHomePageDomain = state =>
  state.get('employeeHomePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeeHomePage
 */

const makeSelectEmployeeHomePage = () =>
  createSelector(selectEmployeeHomePageDomain, substate => substate.toJS());

export default makeSelectEmployeeHomePage;
export { selectEmployeeHomePageDomain };
