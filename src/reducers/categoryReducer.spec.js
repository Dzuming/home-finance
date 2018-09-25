import reducer from "./categoryReducer";
import {selectCategoryType, resetDraggedCategories} from "../actions/categoryActions";
import deepFreeze from "deep-freeze";

const categories = deepFreeze([
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
  types: categories,
  selectedTypes: [],
});

describe('category reducer', () => {
  it('should reduce categories', () => {
    expect(
      reducer(categoriesState, selectCategoryType([categories[0]]))
        .selectedTypes,
    ).toEqual([categories[0]]);
    expect(
      reducer(categoriesState, selectCategoryType(categories[1]))
        .selectedTypes,
    ).toEqual([categories[1]]);
  });

  it('should reset categories', () => {
    expect(
      reducer(categoriesState, resetDraggedCategories()).selectedTypes,
    ).toEqual(categories);
  });
});
