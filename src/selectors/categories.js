import {createSelector} from "reselect";

const GetCategoryTypes = state => state.category.types;
const getSelectedCategories = state => state.category.selectedTypes || state.category.types;

export const makeGetCategoryTypes = createSelector(
  [GetCategoryTypes],
  categories => categories
);

export const makeGetSelectedCategories = createSelector(
  [getSelectedCategories],
  categories => categories
);
