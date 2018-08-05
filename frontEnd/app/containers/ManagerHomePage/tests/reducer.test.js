import { fromJS } from 'immutable';
import managerHomePageReducer from '../reducer';

describe('managerHomePageReducer', () => {
  it('returns the initial state', () => {
    expect(managerHomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
