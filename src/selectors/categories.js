import {createSelector} from "reselect";

const GetCategoryTypes = state => state.category.types;
const getSelectedCategoryTypes = state => state.category.selectedTypes || state.category.types;

export const makeGetCategoryTypes = createSelector(
  [GetCategoryTypes],
  categories => categories
);

export const makeGetSelectedCategoryTypes = createSelector(
  [getSelectedCategoryTypes],
  categories => categories
);

export const makeGetNotSelectedCategoryTypes = createSelector(
  [GetCategoryTypes, getSelectedCategoryTypes],
  (categoryTypes, selectedCategoryTypes) =>
    categoryTypes
      .map(categoryType => {
        if (
          selectedCategoryTypes.find(
            selectedCategoryType =>
              selectedCategoryTypes.id !== categoryType.id
          )
        ) {
          return categoryType;
        }
        if (selectedCategoryTypes.length === 0) {
          return categoryType;
        }
      })
      .filter(result => result)
);
