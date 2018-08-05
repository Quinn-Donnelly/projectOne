import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navigationBar state domain
 */

const selectNavigationBarDomain = state =>
  state.get('navigationBar', initialState);

/**
 * Other specific selectors
 */

const makeSelectCurrentUser = () =>
createSelector(selectNavigationBarDomain, substate => substate.get('currentUser'));

const selectRoute = (state) => state.get('route');
const makeSelectLocation = () =>
  createSelector(selectRoute, substate => substate.get('location').toJS());

/**
 * Default selector used by NavigationBar
 */

const makeSelectNavigationBar = () =>
  createSelector(selectNavigationBarDomain, substate => substate.toJS());

export default makeSelectNavigationBar;
export { selectNavigationBarDomain, makeSelectCurrentUser, makeSelectLocation };
