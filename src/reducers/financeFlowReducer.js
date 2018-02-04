import * as types from '../actions/actionTypes';
export default function financeFlowReducer(state = [], action) {
  switch (action.type) {
    case types.REQUEST_FINANCE_FLOW:
      return Object.assign({}, state, {isFetching: true});
    case types.SUCCESS_FINANCE_FLOW:
      return Object.assign({}, state, {
        isFetching: false,
        spending: action.data.map((financeFlow)=> {
          return {
            id: financeFlow.id,
            description: financeFlow.description,
            spending: financeFlow.value,
            category: financeFlow.category.name,
            dateCreated: financeFlow.created_at.split('T')[0]
          };
        })
      });
    case types.CREATE_FINANCE_FLOW:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.data
      });
    case types.AUTH_USER:
      return Object.assign({}, state, {isAuthenticated: true});
    case types.SET_DATE:
      return Object.assign({}, state, {selectedDate: action.date});
    default:
      return state;
  }
}
