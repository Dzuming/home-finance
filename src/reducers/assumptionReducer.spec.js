import deepFreeze from 'deep-freeze';
import reducer from './budgetReducer';
import { setAssumption } from '../actions/assumptionActions';

const initialState = deepFreeze(reducer({}, { type: 'INIT' }));
const assumptions = [
  {
    id: 1,
    name: 'Poduszka bezpieczeństwa',
    percentage: 20,
    value: 66.6,
  },
  {
    id: 2,
    name: 'Wakacje',
    percentage: 10,
    value: 33.3,
  },
  {
    id: 3,
    name: 'Wakacje',
    percentage: 50,
    value: 695,
  },
];

describe('assumption reducer', () => {
  it('should handle unknown actions', () => {
    expect(reducer(initialState, { type: 'FAKE' })).toBe(initialState);
  });

  describe('get assumption', () => {
    it('should get assumption', () => {
      expect(
        reducer(initialState, setAssumption(assumptions)),
      ).toMatchSnapshot();
    });
  });
});
