import { fromJS } from 'immutable';
import employeeHomePageReducer from '../reducer';

describe('employeeHomePageReducer', () => {
  it('returns the initial state', () => {
    expect(employeeHomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
