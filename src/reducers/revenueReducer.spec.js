import deepFreeze from 'deep-freeze';
import reducer from './revenueReducer';
import { setRevenue } from '../actions/revenueActions';

const initialState = deepFreeze(reducer({}, {type: 'INIT'}));
const revenue = {
  revenue: 50000
};

describe('revenue reducer', () => {
  it('should handle unknown actions', () => {
    expect(reducer(initialState, {type: 'FAKE'})).toBe(initialState);
  });

  describe('get action', () => {
    it('should get revenue', () => {
      expect(reducer(initialState, setRevenue(revenue))).toMatchSnapshot();
    });
  });
});
