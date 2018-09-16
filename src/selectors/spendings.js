import {createSelector} from "reselect";

const getSpending = state => state.financeFlow.spending;

export const makeGetSpending = createSelector(
  [getSpending],
  spending => spending
);
