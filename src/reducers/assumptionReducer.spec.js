import deepFreeze from 'deep-freeze';
import reducer from './assumptionReducer';
import {
  setAssumption,
  setOverallAssumptions,
  addAssumption,
  setAssumptionTypes, selectAssumptionTypes, resetSelectedAssumptionTypes
} from '../actions/assumptionActions';

const initialState = deepFreeze(reducer({ monthly: [] }, { type: 'INIT' }));
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

const draggedTypes = deepFreeze([
  {
    id: 1,
    name: 'rachunki'
  },
  {
    id: 2,
    name: 'jedzenie'
  }
]);

const assumptionTypesState = deepFreeze({
  types: draggedTypes
});

describe('assumption reducer', () => {
  it('should handle unknown actions', () => {
    expect(reducer(initialState, { type: 'FAKE' })).toBe(initialState);
  });

  describe('assumption', () => {
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

  describe(' dragged assumption types', () => {
    it('should reduce assumption types', () => {
      expect(
        reducer(assumptionTypesState, selectAssumptionTypes(draggedTypes[0])).selectedTypes
      ).toEqual([draggedTypes[0]]);
    });
    it('should reset assumption types', () => {
      expect(
        reducer(assumptionTypesState, resetSelectedAssumptionTypes()).types
      ).toEqual(draggedTypes);
    });
  });
});
