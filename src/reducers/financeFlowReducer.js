import * as types from '../actions/actionTypes';
import { financeFlowSpendingToTableMapper } from '../helpers/Mappers';

export default function financeFlowReducer (state = [], action) {
  switch (action.type) {
    case types.REQUEST_FINANCE_FLOW:
      return Object.assign({}, state, {isFetching: true});
    case types.SUCCESS_FINANCE_FLOW:
      return Object.assign({}, state, {
        isFetching: false,
        spending: action.data.map((financeFlow) => {
          return financeFlowSpendingToTableMapper(financeFlow);
        })
      });
    case types.CREATE_FINANCE_FLOW:
      debugger;
      return Object.assign({}, state, {
        isFetching: false,
        spending: [...state.spending, financeFlowSpendingToTableMapper(action.data.spending)],
        message: action.data.message
      });
    case types.AUTH_USER:
      return Object.assign({}, state, {isAuthenticated: true});
    case types.SET_DATE:
      return Object.assign({}, state, {selectedDate: action.date});
    default:
      return state;
  }
}
