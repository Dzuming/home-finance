import reducer from './draggedAssumptionsReducer';
import {
  reduceAssumptionTypes,
  resetDraggedAssumptionTypes
} from '../actions/draggedAssumptionTypes';
import deepFreeze from 'deep-freeze';
import {setAssumption} from "../actions/assumptionActions";

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

describe(' dragged assumption types', () => {
  it('should get assumption', () => {
    expect(
      reducer(assumptionTypesState, setAssumption(assumptions)),
    ).toMatchSnapshot();
  });
  it('should reduce assumption types', () => {
    expect(
      reducer(assumptionTypesState, reduceAssumptionTypes(draggedTypes[0])).draggedTypes
    ).toEqual([draggedTypes[1]]);
  });
  it('should reset assumption types', () => {
    expect(
      reducer(assumptionTypesState, resetDraggedAssumptionTypes()).types
    ).toEqual(draggedTypes);
  });
});
