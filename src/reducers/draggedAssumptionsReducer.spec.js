import reducer from './draggedAssumptionsReducer';
import {
  reduceAssumptionTypes,
  resetDraggedAssumptionTypes
} from '../actions/draggedAssumptionTypes';
import deepFreeze from 'deep-freeze';

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
