import {createSelector} from "reselect";

const getCategories = state => state.category.types;
const getDraggedCategories = state =>
  state.category.draggedCategories || state.category.types;

export const makeGetCategories = createSelector(
  [getCategories],
  categories => categories
);

export const makeGetDraggedCategories = createSelector(
  [getDraggedCategories],
  categories => categories
);
