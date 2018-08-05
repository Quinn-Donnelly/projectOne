import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managerHomePage state domain
 */

const selectManagerHomePageDomain = state =>
  state.get('managerHomePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagerHomePage
 */

const makeSelectManagerHomePage = () =>
  createSelector(selectManagerHomePageDomain, substate => substate.toJS());

export default makeSelectManagerHomePage;
export { selectManagerHomePageDomain };
