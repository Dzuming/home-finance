import {createSelector} from "reselect";

const getCategories = state => state.financeFlow.categories;
const getDraggedCategories = state =>
  state.financeFlow.draggedCategories || state.financeFlow.categories;

export const makeGetCategories = createSelector(
  [getCategories],
  categories => categories
);

export const makeGetDraggedCategories = createSelector(
  [getDraggedCategories],
  categories => categories
);
