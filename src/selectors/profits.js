import {createSelector} from "reselect";

const getProfit = state => state.financeFlow.profit;

export const makeGetProfit = createSelector([getProfit], profit => profit);
