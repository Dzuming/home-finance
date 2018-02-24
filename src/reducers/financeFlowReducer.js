import * as types from '../actions/actionTypes';
import { financeFlowSpendingToTableMapper, financeFlowProfitToTableMapper } from '../helpers/Mappers';

export default function financeFlowReducer (state = [], action) {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return Object.assign({}, state, {
        categories: [...action.payload]
      });
    case types.SPENDING_CRUD.CREATE:
      return Object.assign({}, state, {
        spending: state.spending.concat(financeFlowSpendingToTableMapper(action.payload.spending)),
        message: action.payload.message
      });
    case types.SPENDING_CRUD.READ:
      return Object.assign({}, state, {
        spending: action.payload.map((financeFlow) => {
          return financeFlowSpendingToTableMapper(financeFlow);
        })
      });
    case types.SPENDING_CRUD.UPDATE:
      return Object.assign({}, state, {
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
          );
          return {
            ...element,
            ...items
          };
        }),
        message: action.payload.message || {}
      });
    case types.SPENDING_CRUD.DELETE:
      return Object.assign({}, state, {
        spending: state.spending.filter(spending => spending.id !== action.payload.id),
        message: action.payload.message || {}
      });
    case types.PROFIT_CRUD.CREATE:
      return Object.assign({}, state, {
        profit: state.profit.concat(financeFlowProfitToTableMapper(action.payload.profit)),
        message: action.payload.message
      });
    case types.PROFIT_CRUD.READ:
      return Object.assign({}, state, {
        profit: action.payload.map((profit) => {
          return financeFlowProfitToTableMapper(profit);
        })
      });
    case types.PROFIT_CRUD.UPDATE:
      return Object.assign({}, state, {
        profit: state.profit.map(element => {
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
          );
          return {
            ...element,
            ...items
          };
        }),
        message: action.payload.message || {}
      });
    case types.PROFIT_CRUD.DELETE:
      return Object.assign({}, state, {
        profit: state.profit.filter(profit => profit.id !== action.payload.id),
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
