import reducer from './financeFlowReducer';
import deepFreeze from 'deep-freeze';
import { setSpending } from '../actions/financeFlowActions';

const initialState = deepFreeze(reducer(undefined, {type: 'INIT'}));

describe('finance flow reducer', () => {

  it('should handle unknown actions', () => {
    expect(reducer(initialState, {type: 'FAKE'})).toBe(initialState);
  });

  describe('get finance flow action', () => {
    it('should get spending', () => {
      expect(reducer(initialState, setSpending([{
        id: 1,
        name: 'Zakupy',
        value: 300,
        user_id: 1,
        created_at: '2018-01-01 12:12:12',
        category: {id: 1, name: 'jedzenie'}
      }]))).toMatchSnapshot();
    });
  });
});
