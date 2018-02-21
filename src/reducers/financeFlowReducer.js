import * as types from '../actions/actionTypes';
import { financeFlowSpendingToTableMapper, financeFlowProfitToTableMapper } from '../helpers/Mappers';

export default function financeFlowReducer (state = [], action) {
  switch (action.type) {
    case types.ADD_SPENDING:
      return Object.assign({}, state, {
        isFetching: false,
        spending: state.spending.concat(financeFlowSpendingToTableMapper(action.payload.spending)),
        message: action.payload.message
      });
    case types.SET_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        categories: [...action.payload]
      });
    case types.SET_SPENDING:
      return Object.assign({}, state, {
        isFetching: false,
        spending: action.payload.map((financeFlow) => {
          return financeFlowSpendingToTableMapper(financeFlow);
        })
      });
    case types.SET_PROFIT:
      return Object.assign({}, state, {
        isFetching: false,
        profit: action.payload.map((profit) => {
          return financeFlowProfitToTableMapper(profit);
        })
      });
    case types.REMOVE_SPENDING:
      return Object.assign({}, state, {
        isFetching: false,
        spending: state.spending.filter(spending => spending.id !== action.payload.id),
        message: action.payload.message || {}
      });
    case types.EDIT_SPENDING:
      return Object.assign({}, state, {
        isFetching: false,
        spending: state.spending.map(element => {
          if (element.id !== parseInt(action.payload.id)) {
            return element;
          }
          let items = Object.assign({},
            ...Object.keys(action.payload.items)
              .reduce((total, key) => {
                if (action.payload.items[key] !== undefined) {
                  total.push({[key]: action.payload.items[key]});
                }
                return total;
              }, [])
        )
          return {
            ...element,
            ...items
          };
        }),
        message: action.payload.message || {}
      });
    case types.AUTH_USER:
      return Object.assign({}, state, {isAuthenticated: true});
    case types.SET_DATE:
      return Object.assign({}, state, {selectedDate: action.date});
    default:
      return state;
  }
}
