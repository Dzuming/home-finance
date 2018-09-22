import reducer from "./categoryReducer";
import {reduceCategories, resetDraggedCategories} from "../actions/categoryActions";
import deepFreeze from "deep-freeze";

const draggedCategories = deepFreeze([
  {
    id: 1,
    name: 'rachunki',
  },
  {
    id: 2,
    name: 'jedzenie',
  },
]);

const categoriesState = deepFreeze({
  categories: draggedCategories,
});

describe('category reducer', () => {
  it('should reduce categories', () => {
    expect(
      reducer(categoriesState, reduceCategories([draggedCategories[0]]))
        .draggedCategories,
    ).toEqual([draggedCategories[1]]);
    expect(
      reducer(categoriesState, reduceCategories(draggedCategories))
        .draggedCategories,
    ).toEqual([]);
  });

  it('should reset categories', () => {
    expect(
      reducer(categoriesState, resetDraggedCategories()).draggedCategories,
    ).toEqual(draggedCategories);
  });
});
