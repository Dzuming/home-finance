import * as types from '../actions/actionTypes';
import {
  financeFlowSpendingToTableMapper,
  financeFlowProfitToTableMapper,
} from '../helpers/Mappers';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.SET_CATEGORIES]: (state, action) =>
      Object.assign({}, state, {
        categories: [...action.payload],
      }),
    [types.SPENDING_CRUD.CREATE]: (state, action) =>
      Object.assign({}, state, {
        spending: state.spending.concat(
          financeFlowSpendingToTableMapper(action.payload.spending),
        ),
        message: action.payload.message,
      }),
    [types.SPENDING_CRUD.READ]: (state, action) =>
      Object.assign({}, state, {
        spending: action.payload.map(financeFlow => {
          return financeFlowSpendingToTableMapper(financeFlow);
        }),
      }),
    [types.SPENDING_CRUD.UPDATE]: (state, action) =>
      Object.assign({}, state, {
        spending: state.spending.map(element => {
          if (element.id !== parseInt(action.payload.id)) {
            return element;
          }
          let items = Object.assign(
            {},
            ...Object.keys(action.payload.items).reduce((total, key) => {
              if (action.payload.items[key] !== undefined) {
                total.push({ [key]: action.payload.items[key] });
              }
              return total;
            }, []),
          );
          return {
            ...element,
            ...items,
          };
        }),
        message: action.payload.message || {},
      }),
    [types.SPENDING_CRUD.DELETE]: (state, action) =>
      Object.assign({}, state, {
        spending: state.spending.filter(
          spending => spending.id !== action.payload.id,
        ),
        message: action.payload.message || {},
      }),
    [types.PROFIT_CRUD.CREATE]: (state, action) =>
      Object.assign({}, state, {
        profit: state.profit.concat(
          financeFlowProfitToTableMapper(action.payload.profit),
        ),
        message: action.payload.message,
      }),
    [types.PROFIT_CRUD.READ]: (state, action) =>
      Object.assign({}, state, {
        profit: action.payload.map(profit => {
          return financeFlowProfitToTableMapper(profit);
        }),
      }),
    [types.PROFIT_CRUD.UPDATE]: (state, action) =>
      Object.assign({}, state, {
        profit: state.profit.map(element => {
          if (element.id !== parseInt(action.payload.id)) {
            return element;
          }
          let items = Object.assign(
            {},
            ...Object.keys(action.payload.items).reduce((total, key) => {
              if (action.payload.items[key] !== undefined) {
                total.push({ [key]: action.payload.items[key] });
              }
              return total;
            }, []),
          );
          return {
            ...element,
            ...items,
          };
        }),
        message: action.payload.message || {},
      }),
    [types.PROFIT_CRUD.DELETE]: (state, action) =>
      Object.assign({}, state, {
        profit: state.profit.filter(profit => profit.id !== action.payload.id),
        message: action.payload.message || {},
      }),
    [types.AUTH_USER]: state =>
      Object.assign({}, state, { isAuthenticated: true }),
    [types.SET_DATE]: (state, action) =>
      Object.assign({}, state, { selectedDate: action.date }),
    [types.CATEGORIES_DRAG.SELECT]: (state, action) => {
      return Object.assign({}, state, {
        draggedCategories: state.categories.filter(function(category) {
          return this.indexOf(category.id) < 0;
        }, action.payload.categories.map(category => category.id)),
      });
    },
    [types.CATEGORIES_DRAG.RESET]: state => {
      return Object.assign({}, state, {
        draggedCategories: state.categories,
      });
    },
  },
  initialState,
);
