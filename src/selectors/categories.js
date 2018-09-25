import {createSelector} from "reselect";

const GetCategoryTypes = state => state.category.types;
const getDraggedCategories = state => state.category.selectedTypes || state.category.types;

export const makeGetCategoryTypes = createSelector(
  [GetCategoryTypes],
  categories => categories
);

export const makeGetDraggedCategories = createSelector(
  [getDraggedCategories],
  categories => categories
);
