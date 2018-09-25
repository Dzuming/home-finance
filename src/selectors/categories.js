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

export const makeGetNotSelectedCategoryTypes = createSelector(
  [GetCategoryTypes, getSelectedCategories],
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
