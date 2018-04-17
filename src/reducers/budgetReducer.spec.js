import deepFreeze from 'deep-freeze';
import reducer from './budgetReducer';
import { setBudget } from '../actions/budgetActions';

const initialState = deepFreeze(reducer({}, { type: 'INIT' }));
const budget = {
  budget: 50000,
};

describe('budget reducer', () => {
  it('should handle unknown actions', () => {
    expect(reducer(initialState, { type: 'FAKE' })).toBe(initialState);
  });

  describe('get action', () => {
    it('should get budget', () => {
      expect(reducer(initialState, setBudget(budget))).toMatchSnapshot();
    });
  });
});
