import { createSelector } from 'reselect';

const getProfit = state => state.financeFlow.profit;
const getSpending = state => state.financeFlow.spending;
const getCategories = state => state.financeFlow.categories;

export const makeGetProfit = createSelector([getProfit], profit => profit);

export const makeGetCategories = createSelector(
  [getCategories],
  categories => categories,
);

export const makeGetSpending = createSelector(
  [getSpending],
  spending => spending,
);
