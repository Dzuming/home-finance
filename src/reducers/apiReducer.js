import * as types from '../actions/actionTypes';

export default function apiReducer (state = [], action) {
  switch (action.type) {
    case types.API_REQUEST.PENDING:
      return Object.assign({}, state, {
        loading: state.loading + 1
      });
    case types.API_REQUEST.SUCCESS:
      return Object.assign({}, state, {
        loading: state.loading - 1
      });
    default:
      return state;
  }
}
