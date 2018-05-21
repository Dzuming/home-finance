import deepFreeze from 'deep-freeze';
import reducer from './budgetReducer';
import {
  setAssumption,
  setOverallAssumptions,
  addAssumption,
  setAssumptionTypes,
} from '../actions/assumptionActions';

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
const assumption = {
  userId: 1,
  assumptionTypeId: 1,
  percentage: 20,
  isInitialValue: 0,
  period: '2018-04',
};
const overallAssumptions = [
  {
    name: 'Poduszka bezpieczeństwa',
    value: 66.6,
  },
  {
    name: 'Wakacje',
    value: 33.3,
  },
  {
    name: 'Wakacje',
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
    it('should get overall assumption', () => {
      expect(
        reducer(initialState, setOverallAssumptions(overallAssumptions)),
      ).toMatchSnapshot();
    });
    it('should post assumption', () => {
      expect(
        reducer(initialState, addAssumption(assumption)),
      ).toMatchSnapshot();
    });
  });

  describe('get assumption types', () => {
    it('should get assumption types', () => {
      expect(
        reducer(initialState, setAssumptionTypes('2018-05')),
      ).toMatchSnapshot();
    });
  });
});
