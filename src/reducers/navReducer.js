import * as types from '../actions/actionTypes';
export default function contentReducer(state = [], action) {
  switch (action.type) {
    case types.OPEN_SIDENAV:
      return Object.assign({}, state, {
        isOpen: action.isOpen
      })
    default:
      return state;
  }
}