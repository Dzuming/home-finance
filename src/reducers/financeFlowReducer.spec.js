import reducer from './financeFlowReducer';
import deepFreeze from 'deep-freeze';
import { setSpending, addSpending, removeSpending } from '../actions/financeFlowActions';

const initialState = deepFreeze(reducer({spending: []}, {type: 'INIT'}));
const spending = {
  id: 1,
  name: 'Zakupy',
  value: 300,
  user_id: 1,
  created_at: '2018-01-01 12:12:12',
  category: {id: 1, name: 'jedzenie'}
};
const message = 'test';
describe('spending reducer', () => {
  it('should handle unknown actions', () => {
    expect(reducer(initialState, {type: 'FAKE'})).toBe(initialState);
  });

  describe('get action', () => {
    it('should get spending', () => {
      expect(reducer(initialState, setSpending([spending]))).toMatchSnapshot();
    });
  });

  describe('add action', () => {
    it('should add recipe to empty list', () => {
      expect(reducer(initialState, addSpending({spending, message}))).toMatchSnapshot();
    });

    it('should add recipe to a non-empty list', () => {
      const nonEmptyState = deepFreeze(reducer(initialState, addSpending({spending, message})));

      expect(reducer(nonEmptyState, addSpending({spending, message}))).toMatchSnapshot();
    });
  });

  describe('delete action', () => {
    const baseState = deepFreeze(
      [{spending: {...spending, id: 1} }, {spending: {...spending, id: 2}}, {spending: {...spending, id: 3}}]
        .reduce((state, spending) => reducer(state, addSpending(spending)), initialState)
    );

    it('should delete spending when exists', () => {
      expect(reducer(baseState, removeSpending({id: 1}))).toMatchSnapshot();
    });

    it('should not delete spending when it doesn\'t exist', () => {
      expect(reducer(baseState, removeSpending({id: 4}))).toMatchSnapshot();
    });
  });
});

