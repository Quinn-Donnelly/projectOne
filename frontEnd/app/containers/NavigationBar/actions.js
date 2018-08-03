/*
 *
 * NavigationBar actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import { LOGOUT } from '../LoginPage/constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  }
}
