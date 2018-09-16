import { createSelector } from 'reselect';

const getProfit = state => state.financeFlow.profit;
const getSpending = state => state.financeFlow.spending;
const getMonthlyAssumption = state => state.assumptions.monthly;
const getOverallAssumption = state => state.assumptions.overall;
const getSelectedAssumptionTypes = state => state.assumptions.selectedTypes;
const getAssumptionTypes = state => state.assumptions.types;
const getCategories = state => state.financeFlow.categories;
const getDraggedCategories = state =>
  state.financeFlow.draggedCategories || state.financeFlow.categories;
export const makeGetProfit = createSelector([getProfit], profit => profit);

export const makeGetCategories = createSelector(
  [getCategories],
  categories => categories
);

export const makeGetSpending = createSelector(
  [getSpending],
  spending => spending
);

export const makeGetMonthlyAssumption = createSelector(
  [getMonthlyAssumption],
  monthlyAssumption => monthlyAssumption
);

export const makeGetOverallAssumption = createSelector(
  [getOverallAssumption],
  overallAssumptions => overallAssumptions
);

export const makeGetAssumptionTypes = createSelector(
  [getAssumptionTypes],
  assumptionTypes => assumptionTypes
);

export const makeGetNotSelectedAssumptionTypes = createSelector(
  [getAssumptionTypes, getSelectedAssumptionTypes],
  (assumptionTypes, selectedAssumptionTypes) =>
    assumptionTypes
      .map(assumptionType => {
        if (
          selectedAssumptionTypes.find(
            selectedAssumptionType =>
              selectedAssumptionType.id !== assumptionType.id
          )
        ) {
          return assumptionType;
        }
        if(selectedAssumptionTypes.length === 0) {
          return assumptionType
        }
      })
      .filter(result => result)
);

export const makeGetDraggedCategories = createSelector(
  [getDraggedCategories],
  categories => categories
);
