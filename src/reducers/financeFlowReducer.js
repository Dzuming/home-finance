import * as types from '../actions/actionTypes';
export default function financeFlowReducer(state = [], action) {
  switch (action.type) {
    case types.REQUEST_FINANCE_FLOW:
      return Object.assign({}, state, {isFetching: true});
    case types.SUCCESS_FINANCE_FLOW:
    
      return Object.assign({}, state, {
        isFetching: false,
        spending: action.data.map((value)=> {
          return {
            id: value._id,
            description: value.Description, 
            spending: value.Spending,
            dateCreated: value.DateCreated.split('T')[0] 
          }
        })
      });
    case types.AUTH_USER:
      return Object.assign({}, state, {isAuthenticated: true});
    case types.SET_DATE:
      return Object.assign({}, state, {selectedDate: action.date});
    default:
      return state;
  }
}
